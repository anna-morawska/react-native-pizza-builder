import { Cheese } from "../components/Cheese/Cheese";
import { Jalapenos } from "../components/Jalapenos/Jalapenos";
import { Mushroom } from "../components/Mushroom/Mushroom";
import { Olives } from "../components/Olives/Olives";
import { Pineapple } from "../components/Pineapple/Pineapple";
import { Basil } from "../components/Basil/Basil";
import { Becon } from "../components/Becon/Becon";
import { Ham } from "../components/Ham/Ham";

import { Ingredients } from "../models/Ingredients";
import { FILTERS } from "../constants/constants";

export const INGREDIENTS = [
  new Ingredients({
    name: "Cheese",
    componentName: "Cheese",
    component: Cheese,
    price: 1,
    welcomeScreenQty: 10,
    category: FILTERS.veggies
  }),
  new Ingredients({
    name: "Jalapenos",
    componentName: "Jalapenos",
    component: Jalapenos,
    price: 2,
    welcomeScreenQty: 10,
    category: FILTERS.veggies
  }),
  new Ingredients({
    name: "Mushroom",
    componentName: "Mushroom",
    component: Mushroom,
    price: 3,
    welcomeScreenQty: 10,
    category: FILTERS.veggies
  }),
  new Ingredients({
    name: "Vege Becon",
    componentName: "Becon",
    component: Becon,
    price: 7,
    welcomeScreenQty: 10,
    category: FILTERS.meat
  }),
  new Ingredients({
    name: "Olives",
    componentName: "Olives",
    component: Olives,
    price: 4,
    welcomeScreenQty: 10,
    category: FILTERS.veggies
  }),
  new Ingredients({
    name: "Pineapple",
    componentName: "Pineapple",
    component: Pineapple,
    price: 5,
    welcomeScreenQty: 10,
    category: FILTERS.veggies
  }),
  new Ingredients({
    name: "Vege Ham",
    componentName: "Ham",
    component: Ham,
    price: 5,
    welcomeScreenQty: 10,
    category: FILTERS.veggies
  }),
  new Ingredients({
    name: "Basil",
    componentName: "Basil",
    component: Basil,
    price: 6,
    welcomeScreenQty: 10,
    category: FILTERS.veggies
  })
];
