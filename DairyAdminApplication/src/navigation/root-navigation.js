import React, { useState, useEffect } from 'react';
import { useTheme, DefaultTheme, DarkTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import { StackNavigator as AuthenticationStackNavigator } from '../modules/authentication';
import { StackNavigator as BrandStackNavigator } from '../modules/brands';
import { BottomTabs } from './bottom-tabs';
import { DrawerContent } from '../components';

const Authenticated = createDrawerNavigator();

const AuthenticatedDrawerNavigator = () => {
  return (
    <Authenticated.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Authenticated.Screen name="Home" component={BottomTabs} />
      <Authenticated.Screen name="Brand" component={BrandStackNavigator} />
    </Authenticated.Navigator>
  );
};

export const RootNavigator = () => {
  const user = useSelector((state) => state.authenticationReducer.user);
  const isLoggedIn = !!user;
  // add exclamation before isLoggedIn on line 29 to see inner screens
  // ex. !isLoggedIn
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AuthenticatedDrawerNavigator />
      ) : (
        <AuthenticationStackNavigator />
      )}
    </NavigationContainer>
  );
};
