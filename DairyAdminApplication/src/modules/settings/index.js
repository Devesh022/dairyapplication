import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import SettingsMenu from './screens/SettingsMenu';
import ProfileInformation from './screens/ProfileInformation'
import ChangePassword from './screens/ChangePassword'

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="SettingsMenu" component={SettingsMenu} />
    <Stack.Screen name="ProfileInformation" component={ProfileInformation} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
  </Stack.Navigator>
)

export {StackNavigator};