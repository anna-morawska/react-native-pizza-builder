class Ingredients {
  constructor({
    name,
    price,
    component,
    welcomeScreenQty,
    category,
    componentName
  }) {
    this.name = name;
    this.price = price;
    this.component = component;
    this.welcomeScreenQty = welcomeScreenQty;
    this.category = category;
    this.componentName = componentName;
  }
}

export { Ingredients };
