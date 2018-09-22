import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeScreen from './src/HomeScreen';
import AboutScreen from './src/AboutScreen';
import ContactScreen from './src/ContactScreen';
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/SignUpScreen';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDAJwL-20mzpMRDtngY6BCBQnhtZIQzivU",
  authDomain: "reactfirebase-d88fd.firebaseapp.com",
  databaseURL: "https://reactfirebase-d88fd.firebaseio.com",
  projectId: "reactfirebase-d88fd",
  storageBucket: "reactfirebase-d88fd.appspot.com",
  messagingSenderId: "905243242658"
};
firebase.initializeApp(firebaseConfig);

const AuthStackNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  SignUpScreen: SignUpScreen
})

LoginScreen.navigationOptions = ({ navigation }) => {
  let headerTitle = "Login";
  return {
    headerTitle,
  };
};

const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
    }
  },
  AboutScreen: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'About',
    }
  },
  ContactScreen: {
    screen: ContactScreen,
    navigationOptions: {
      tabBarLabel: 'Contact',
    }
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
  }
})


AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle = routeName.replace('Screen', ' ');
  return {
    headerTitle,
  };
};


export default createSwitchNavigator({
  Auth: AuthStackNavigator,
  App: AppStackNavigator
})