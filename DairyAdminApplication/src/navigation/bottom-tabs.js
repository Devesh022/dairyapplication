import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { StackNavigator as HomeNavigator } from '../modules/home';
import { StackNavigator as NotificationsStackNavigator } from '../modules/notifications';
import { StackNavigator as SettingsStackNavigator } from '../modules/settings';
import { paperTheme } from './../utils/theme';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        labeled={false}
        backBehavior="initialRoute"
        shifting={true}
        sceneAnimationEnabled={false}
        barStyle={{
          backgroundColor: paperTheme.colors.primary,
        }}
        tabBarOptions={{
          scrollEnabled: true,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: 'home',
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationsStackNavigator}
          options={{
            tabBarIcon: 'home', // change icon
          }}
        />
        <Tab.Screen
          name="Account"
          component={SettingsStackNavigator}
          options={{
            tabBarIcon: 'account',
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
