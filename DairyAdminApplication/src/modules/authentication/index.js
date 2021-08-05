import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';

import reducer from './reducer';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

export { reducer, StackNavigator };
