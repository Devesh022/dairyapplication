import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = ({ goBack, iconColor }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Icon name="arrow-back" size={30} color={iconColor ? iconColor : '#000'} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
});

export default memo(BackButton);
