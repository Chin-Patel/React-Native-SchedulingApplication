import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/SignUpScreen';
import ResetPasswordScreen from './src/ResetPasswordScreen';
import CompletedTasksScreen from './src/CompletedTasksScreen';
import SettingsScreen from './src/SettingsScreen';
import CreateTaskScreen from './src/CreateTaskScreen';
//Main screens
import CategoriesScreen from './src/CategoriesScreen';
import * as firebase from 'firebase';
import {  Icon,  } from 'native-base'

console.disableYellowBox = true;

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
  SignUpScreen: SignUpScreen,
  ResetPasswordScreen: ResetPasswordScreen
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
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={24} />
      )
    }
  },
  CategoriesScreen: {
    screen: CategoriesScreen,
    navigationOptions: {
      tabBarLabel: 'Categories',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-apps" color={tintColor} size={24} />
      )
    }
  },
  CompletedTasksScreen: {
    screen: CompletedTasksScreen,
    navigationOptions: {
      tabBarLabel: 'Completed Tasks',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-bulb" color={tintColor} size={24} />
      )
    }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-settings" color={tintColor} size={24} />
      )
    }
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
  },
  CreateTaskScreen: {
    screen: CreateTaskScreen,
    navigationOptions: {
      tabBarLabel: 'Create Task',
    }
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
  App: AppStackNavigator,
  

})