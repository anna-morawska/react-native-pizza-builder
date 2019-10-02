import React, { useEffect, useState, useMemo } from "react";
import { ScrollView, View, StyleSheet, Text, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { PieChart } from "react-native-chart-kit";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { Header, HeaderButton, Loader, ErrorHandler } from "../../components";
import { getPollResults } from "../../store/actions/builder";
import { loadingFinish, loadingStart } from "../../store/actions/utils";

import {
  THIN,
  THICK,
  CHEESY,
  GLUTENFREE,
  SMALL,
  MEDIUM,
  LARGE
} from "../../constants/constants";

const sizeInitialData = [
  {
    id: SMALL,

    name: "Small",
    color: "#3C153B",
    legendFontColor: "#3C153B",
    legendFontSize: 15,
    votes: 0
  },
  {
    id: MEDIUM,
    name: "Medium",
    color: "#F9424D",
    legendFontColor: "#F9424D",
    legendFontSize: 15,
    votes: 0
  },
  {
    id: LARGE,
    name: "Large",
    color: "#666370",
    legendFontColor: "#666370",
    legendFontSize: 15,
    votes: 0
  }
];

const crustInitialData = [
  {
    id: THIN,
    name: "Thin",
    color: "#F0B117",
    legendFontColor: "#F0B117",
    legendFontSize: 15,
    votes: 0
  },
  {
    id: THICK,
    name: "Thick",
    color: "#FF006E",
    legendFontColor: "#FF006E",
    legendFontSize: 15,
    votes: 0
  },
  {
    id: GLUTENFREE,
    name: "Gluten Free",
    color: "#FB5607",
    legendFontColor: "#FB5607",
    legendFontSize: 15,
    votes: 0
  },
  {
    id: CHEESY,
    name: "Cheesy",
    color: "#8338EC",
    legendFontColor: "#8338EC",
    legendFontSize: 15,
    votes: 0
  }
];

const toppingsInitialData = [
  {
    name: "Basil",
    color: "#28502E",
    legendFontColor: "#28502E",
    legendFontSize: 15,
    votes: 0
  },
  {
    name: "Becon",
    color: "#6B2D5C",
    legendFontColor: "#6B2D5C",
    legendFontSize: 15,
    votes: 0
  },
  {
    name: "Cheese",
    color: "#465775",
    legendFontColor: "#465775",
    legendFontSize: 15,
    votes: 0
  },
  {
    name: "Ham",
    color: "#C1839F",
    legendFontColor: "#C1839F",
    legendFontSize: 15,
    votes: 0
  },
  {
    name: "Jalapenos",
    color: "#7FB069",
    legendFontColor: "#7FB069",
    legendFontSize: 15,
    votes: 0
  },
  {
    name: "Mushroom",
    color: "#FF8C42",
    legendFontColor: "#FF8C42",
    legendFontSize: 15,
    votes: 0
  },
  {
    name: "Olives",
    color: "#B1EDE8",
    legendFontColor: "#B1EDE8",
    legendFontSize: 15,
    votes: 0
  },
  {
    name: "Pineapple",
    color: "#2D7DD2",
    legendFontColor: "#2D7DD2",
    legendFontSize: 15,
    votes: 0
  }
];

const PollResults = () => {
  const [ordersNumber, setOrdersNumber] = useState(0);
  const [sizeData, setSizeData] = useState(sizeInitialData);
  const [crustData, setCrustData] = useState(crustInitialData);
  const [toppingsData, setToppingsData] = useState(toppingsInitialData);

  const dispatch = useDispatch();
  const pollResults = useSelector(state => state.pollResults);

  const deviceWidth = useMemo(() => Dimensions.get("window").width, []);

  useEffect(() => {
    if (Object.keys(pollResults).length === 0) {
      return;
    }
    const { orders_counter } = pollResults;

    setOrdersNumber(orders_counter.value);
    updateSizeData();
    updateCrustData();
    updateToppingsData();
  }, [pollResults]);

  useEffect(() => {
    const getResults = async () => {
      try {
        dispatch(loadingStart());
        await dispatch(getPollResults());
        dispatch(loadingFinish());
      } catch {
        dispatch(loadingFinish());
      }
    };

    getResults();
  }, []);

  const updateToppingsData = () => {
    const { toppings_preferences } = pollResults;

    const updatedToppingsPreferencesData = [];

    toppingsData.forEach(topping => {
      return Object.keys(toppings_preferences).forEach(toppingName => {
        if (topping.name === toppingName) {
          updatedToppingsPreferencesData.push({
            ...topping,
            votes: toppings_preferences[toppingName]
          });
        }
      });
    });

    setToppingsData(updatedToppingsPreferencesData);
  };

  const updateCrustData = () => {
    const { crust_preferences } = pollResults;

    const updatedCrustPreferencesData = [];

    crustData.map(crust => {
      return Object.keys(crust_preferences).forEach(crustType => {
        if (crust.id === crustType) {
          updatedCrustPreferencesData.push({
            ...crust,
            votes: crust_preferences[crustType]
          });
        }
      });
    });

    setCrustData(updatedCrustPreferencesData);
  };

  const updateSizeData = () => {
    const { size_preferences } = pollResults;

    const updatedSizePreferencesData = [];

    sizeData.map(size => {
      return Object.keys(size_preferences).forEach(sizeType => {
        if (size.id === sizeType) {
          updatedSizePreferencesData.push({
            ...size,
            votes: size_preferences[sizeType]
          });
        }
      });
    });
    setSizeData(updatedSizePreferencesData);
  };

  return (
    <>
      <ErrorHandler />
      <ScrollView>
        <Text style={styles.header}>
          Thanks, now you can wait for your imaginary order to be delivered. In
          a meanwhile take a look at data about other people pizza preferences:
        </Text>
        <View style={styles.chartsWrapper}>
          <Loader>
            <Text style={{ ...styles.chartHeader, marginBottom: 30 }}>
              {`Total Orders: ${ordersNumber}`}
            </Text>
            <Text style={styles.chartHeader}>Toppings:</Text>
            <PieChart
              width={deviceWidth}
              height={250}
              accessor="votes"
              paddingLeft="20"
              absolute
              data={toppingsData}
              backgroundColor="transparent"
              chartConfig={{
                color: () => `rgba(255, 255, 255, 1)`
              }}
            />
            <Text style={styles.chartHeader}>Crust:</Text>
            <PieChart
              width={deviceWidth}
              height={200}
              accessor="votes"
              paddingLeft="10"
              absolute
              data={crustData}
              backgroundColor="transparent"
              chartConfig={{
                color: () => `rgba(255, 255, 255, 1)`,
                style: {
                  borderRadius: 16
                }
              }}
            />
            <Text style={styles.chartHeader}>Size:</Text>
            <PieChart
              width={deviceWidth}
              height={200}
              accessor="votes"
              paddingLeft="10"
              absolute
              data={sizeData}
              backgroundColor="transparent"
              chartConfig={{
                color: () => `rgba(255, 255, 255, 1)`
              }}
            />
          </Loader>
        </View>
      </ScrollView>
    </>
  );
};

PollResults.navigationOptions = navigationData => {
  return {
    headerTitle: <Header text="Poll Results" />,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => navigationData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chartHeader: {
    textAlign: "left",
    fontSize: 20,
    marginLeft: 30,
    fontFamily: "Damion"
  },
  header: {
    marginVertical: 30,
    marginHorizontal: 20,
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center"
  },
  chartsWrapper: {
    width: "100%",
    marginBottom: 40
  }
});

export { PollResults };
