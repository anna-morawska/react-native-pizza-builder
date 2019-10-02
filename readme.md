# Pizza Builder

A side project aimed to familiarize me with React Native ecosystem.  
The builder allows you to compose an imaginary pizza 🍕 Only best ingredients, 100% vegan.

![screenshots set](https://github.com/anna-morawska/react-native-pizza-builder/blob/master/assets/readme-1.jpg)
![screenshots set](https://github.com/anna-morawska/react-native-pizza-builder/blob/master/assets/readme-2.jpg)

## Usage

The app collects the data about orders and processes them on BE side to provide you with the analysis of users preferences and choices. As a BE solution, I used Firebase. I wrote a custom cloud function to generate the report.

Besides that, the app is pretty useless - but was a playground to implement core and crucial features like use of native device camera, location or full authentication flow.

## Installation

To start the project:

1. run:

```bash
     npm install
```

2. fill out env.default.js with your API data, and rename the file to env.js

3. run:

```bash
     npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
