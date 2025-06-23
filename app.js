import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductFormScreen from './screens/ProductFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Produtos" component={ProductListScreen} />
        <Stack.Screen name="Novo Produto" component={ProductFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
