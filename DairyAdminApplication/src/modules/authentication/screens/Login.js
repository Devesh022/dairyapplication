import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { useTheme, Portal, Snackbar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// Project Imports
import {
  Background,
  Block,
  Logo,
  Text,
  TextInput,
  Button,
} from './../../../components';
import { login, setUser, setToken } from './../actions';

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showSnackbar = (text) => {
    setSnackbarText(text);
    setSnackbarVisible(true);
  };

  const onDismissSnackBar = () => {
    setSnackbarVisible(false);
    setSnackbarText(null);
  };

  const validateMobileAndPassword = () => {
    let isValid = true;
    if (!username) {
      isValid = false;
      showSnackbar('Please enter mobile no');
    } else if (!password) {
      isValid = false;
      showSnackbar('Please enter password');
    }
    return isValid;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      if (validateMobileAndPassword()) {
        const { token, user } = await dispatch(
          login({
            Mobile: username,
            Password: password,
          }),
        );
        if (token && user) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setLoading(false);
          showSnackbar('Login successful.');
          dispatch(setToken(user));
          dispatch(setUser(user));
        } else {
          setLoading(false);
          showSnackbar('Login unsuccessful.');
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data, error.request);
      setLoading(false);
      let message = 'An error occurred while processing your request.';
      if (error.response) {
        const { message: serverMessage } = error.response.data;
        if (serverMessage) {
          message = serverMessage;
        }
      } else if (error.request) {
        message = 'Invalid request';
      }
      showSnackbar(message);
    }
  };

  return (
    <Background>
      <Logo />
      <Text h1 bold color={theme.colors.primary}>
        Welcome back
      </Text>
      <TextInput
        label="Mobile No."
        returnKeyType="next"
        value={username}
        onChangeText={(value) => setUsername(value)}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        autoCapitalize="none"
        returnKeyType="default"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}>
        Login
      </Button>
      <Portal>
        <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackBar}>
          {snackbarText}
        </Snackbar>
      </Portal>
    </Background>
  );
};

export default Login;
