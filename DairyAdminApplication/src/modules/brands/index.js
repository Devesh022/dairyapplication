import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from './screens/List';
import Create from './screens/Create';

import reducer from './reducer';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="List" component={List} />
    <Stack.Screen
      name="Create"
      component={Create}
      options={{ headerTitle: 'Add New Brand' }}
    />
  </Stack.Navigator>
);

export { reducer, StackNavigator };
