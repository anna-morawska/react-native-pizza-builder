const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// onWrite remove old record
exports.removeOldRecord = functions.database
  .ref("/users/{userId}/{dataId}")
  .onWrite(async change => {
    const parentRef = change.after.ref.parent;

    return parentRef.once("value").then(snapshot => {
      if (snapshot.numChildren() > 1) {
        let childCount = 0;

        const updates = {};

        snapshot.forEach(child => {
          if (++childCount <= snapshot.numChildren() - 1) {
            updates[child.key] = null;
          }
          return;
        });

        return parentRef.update(updates);
      }
      return;
    });
  });

exports.countOrders = functions.database
  .ref("/orders/{userId}/{orderIs}")
  .onWrite(async change => {
    const ordersCounterRef = admin.database().ref("analytics/orders_counter");

    ordersCounterRef.once("value", async snapshot => {
      if (!snapshot.exists()) {
        await ordersCounterRef.set({
          value: 1
        });
      } else {
        await ordersCounterRef.set({
          value: snapshot.val().value + 1
        });
      }
    });

    return null;
  });

exports.measureSizeAndCrustPreferences = functions.database
  .ref("/orders/{userId}/{orderIs}")
  .onWrite(async change => {
    const incrementCounter = async (parentRef, propertyName) => {
      await parentRef
        .child(`${propertyName}`)
        .transaction(current => (current || 0) + 1);

      return null;
    };

    const { crust, size } = change.after.val();
    const crustPreferencesRef = admin
      .database()
      .ref("analytics/crust_preferences");
    const sizePreferencesRef = admin
      .database()
      .ref("analytics/size_preferences");

    await incrementCounter(crustPreferencesRef, crust);
    await incrementCounter(sizePreferencesRef, size);

    return null;
  });

exports.measureToppingsPreferences = functions.database
  .ref("/orders/{userId}/{orderIs}")
  .onWrite(async change => {
    const toppingsPreferencesRef = admin
      .database()
      .ref("analytics/toppings_preferences");
    const { toppings } = change.after.val();
    const {
      Cheese: CheeseValue,
      Jalapenos: JalapenosValue,
      Mushroom: MushroomValue,
      Becon: BeconValue,
      Olives: OlivesValue,
      Pineapple: PineappleValue,
      Ham: HamValue,
      Basil: BasilValue
    } = toppings;

    toppingsPreferencesRef.once("value", async snapshot => {
      if (!snapshot.exists()) {
        await toppingsPreferencesRef.set({
          Cheese: CheeseValue,
          Jalapenos: JalapenosValue,
          Mushroom: MushroomValue,
          Becon: BeconValue,
          Olives: OlivesValue,
          Pineapple: PineappleValue,
          Ham: HamValue,
          Basil: BasilValue
        });
      } else {
        const {
          Cheese,
          Jalapenos,
          Mushroom,
          Becon,
          Olives,
          Pineapple,
          Ham,
          Basil
        } = snapshot.val();

        await toppingsPreferencesRef.set({
          Cheese: Cheese + CheeseValue,
          Jalapenos: Jalapenos + JalapenosValue,
          Mushroom: Mushroom + MushroomValue,
          Becon: Becon + BeconValue,
          Olives: Olives + OlivesValue,
          Pineapple: Pineapple + PineappleValue,
          Ham: Ham + HamValue,
          Basil: Basil + BasilValue
        });
      }
    });

    return null;
  });
