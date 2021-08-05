import React, { useEffect } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// Project Imports
import store, { persistor } from './redux/store';
import { paperTheme } from './utils';
import { resetAppReady } from './modules/common/actions';
import { RootNavigator } from './navigation/root-navigation';

const App = () => {
  const dispatch = useDispatch();
  const appReady = useSelector((state) => state.commonReducer.appReady);
  useEffect(() => {
    dispatch(resetAppReady());
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar backgroundColor={'#757575'} />
      <RootNavigator />
    </PaperProvider>
  );
};

const AppWrapper = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </StoreProvider>
  );
};

export default AppWrapper;
