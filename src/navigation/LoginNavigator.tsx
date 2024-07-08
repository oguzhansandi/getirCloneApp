import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import LoginScreen from '../screens/LoginScreen';
import HeaderCartBtn from '../components/HeaderCartBtn';
import { Image } from 'react-native';

const Stack = createStackNavigator();

function LoginNavigator( ) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='loginScreen'
        component={LoginScreen}
        options={{
          headerStyle: { backgroundColor: "#5C3EBC" },
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image
              source={require("../../assets/getirlogo.png")}
              style={{ width: 70, height: 30 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginNavigator