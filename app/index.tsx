import React from "react";
import { LogBox, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import RootNavigator from "../src/navigation/RootNavigator";
import { store } from "../src/redux/store";
import * as Linking from "expo-linking";

LogBox.ignoreAllLogs();

const prefix = Linking.createURL('/');

export default function App() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Search: {
          screens: {
            Home: "home",
            CategoryDetails: "category",
            ProductDetails: "product/contentId/:contentId",
            CartDetails: "cart/contentId/:contentId",
          },
          parse: {
            contentId: (message: string) => `${message} `
          }
        }
      }
    },
  };

  return (
    <Provider store={store}>
        <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
