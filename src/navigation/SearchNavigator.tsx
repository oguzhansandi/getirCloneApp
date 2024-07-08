import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import SearchScreen from '../screens/SearchScreen';
import HeaderCartBtn from '../components/HeaderCartBtn';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator();

function SearchNavigator( ) {

  const cartItem= useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const showCartBtn = cartItem.length > 0
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='searchScreen'
        component={SearchScreen}
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
    </Stack.Navigator>
  )
}

export default SearchNavigator