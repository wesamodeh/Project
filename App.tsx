import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import { store } from "./src/redux/Store";
import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </Provider>
  );
}
