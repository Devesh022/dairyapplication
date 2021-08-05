import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Title, Drawer, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Block from './Block';
import { logout } from '../modules/authentication/actions';
import { setLoading } from '../redux/loader/actions';

// const defaultAvatar = require('./../assets/default-avatar.jpg');

export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const { navigation } = props;
  const user = useSelector((state) => state.authenticationReducer.user);

  const handleLogout = () => {
    navigation.toggleDrawer();
    dispatch(setLoading('Logging out...'));
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0, paddingBottom: 0, flex: 1 }}>
      <Block flex={1} style={{}}>
        <Block flex={1}>
          <Block noflex bottom style={{ height: 150 }} padding={[0, 10]}>
            <Avatar.Image
              size={64}
              source={{
                uri: 'https://randomuser.me/api/portraits/women/2.jpg',
              }}
            />
            <Title style={styles.title}>Welcome, {user.Name}</Title>
          </Block>
          <Divider />
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'Home',
                  params: { screen: 'Home' },
                })
              }
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Brands"
              onPress={() => navigation.navigate('Brand')}
            />
            {/*Add drawer item here*/}
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'Home',
                  params: { screen: 'Home' },
                })
              }
            /> */}
          </Drawer.Section>
        </Block>
        <Block noflex style={{ backgroundColor: '#adadad' }}>
          <Divider />
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="logout" color={color} size={size} />
              )}
              label="Logout"
              onPress={() => handleLogout()}
            />
          </Drawer.Section>
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    //marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
