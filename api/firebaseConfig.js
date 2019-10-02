import * as Firebase from "firebase";

import { FIREBASE_CONFIG } from "../env";

const app = Firebase.initializeApp(FIREBASE_CONFIG);

export const db = app.storage();
