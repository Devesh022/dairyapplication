import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from './screens/Notification';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Notification" component={Notification} />
  </Stack.Navigator>
);

export { StackNavigator };
