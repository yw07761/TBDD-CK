import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Home from './src/screen/Home';

export default function App() {
  return (
      <Provider store={store}>
        <Home/>
      </Provider>
  );
}


