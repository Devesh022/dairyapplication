import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import { clearStore, me, setToken, setUser } from '../../authentication/actions';
import { setAppReady } from './../actions'

const SplashScreen = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    // console.log('mounting');
    let source = axios.CancelToken.source();
    const checkUser = async () => {
      try {
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const data = await dispatch(me(source.token));
          if (data) {
            await dispatch(setToken(token));
            await dispatch(setUser(data));
            await dispatch(setAppReady());
          } else {
            // console.log(`user not found`);
            await dispatch(clearStore());
            await dispatch(setAppReady());
          }
        } else {
          // console.log(`token not found`);
          // await dispatch(clearStore());
          await dispatch(setAppReady());
        }
      } catch (error) {
        // console.log(error);
        // await dispatch(clearStore());
        await dispatch(setAppReady());
      }
    };
    checkUser();

    return () => {
      // console.log('unmounting');
      source.cancel();
    };
  }, [token]);

  return (
    <View>
      <Text>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;
