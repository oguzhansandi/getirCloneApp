import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import {Image, Text, TouchableOpacity, View } from "react-native";
import FilteredCategoryScreen from "../screens/FilteredCategoryScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  ParamListBase,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import HeaderCartBtn from '../components/HeaderCartBtn'
import CartDetailScreen from '../screens/CartDetailScreen'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CLEAR_CART } from "../redux/Cart/cartSlice";

const Stack = createStackNavigator();

interface MyStackProps {
  navigation: NavigationProp<ParamListBase>;
}

function MyStack({ navigation} : MyStackProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const showCartBtn = cartItems.length > 0;



  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image
              source={require("../../assets/getirlogo.png")}
              style={{ width: 70, height: 30 }}
            />
          ),
          headerRight: () => (
            showCartBtn && <HeaderCartBtn />
          ),
        }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={FilteredCategoryScreen}
        options={{
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
              Ürünler
            </Text>
          ),
          headerRight: () => (
            showCartBtn && <HeaderCartBtn />
          ),
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Ürün Detayı
            </Text>
          ),
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 8 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            showCartBtn && <HeaderCartBtn />
          ),
          key: route.params.key,
        })}
      />
      <Stack.Screen 
        name="CartDetails"
        component={CartDetailScreen}
        options={{
          headerTitle: () =>(
            <Text style={{color:'white', fontWeight: 'bold', fontSize: 15}}>
                Sepetim
            </Text>
          ),  
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingLeft: 8 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 8 }}
              onPress={() => dispatch(CLEAR_CART())}
            >
              <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator({ navigation, route }) {
  return <MyStack navigation={navigation} route={route} />;
}
