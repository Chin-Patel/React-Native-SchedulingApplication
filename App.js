import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/LoginScreen';
import SignUpScreen from './src/SignUpScreen';
import ResetPasswordScreen from './src/ResetPasswordScreen';
import CompletedTasksScreen from './src/CompletedTasksScreen';
import SettingsScreen from './src/SettingsScreen';
import CreateTaskScreen from './src/CreateTaskScreen';
import TaskInformationScreen from './src/TaskInformation';
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
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerMode: 'none',
      visible: false,
      
    }
  },
  SignUpScreen: SignUpScreen,
  ResetPasswordScreen: ResetPasswordScreen
})

LoginScreen.navigationOptions = ({navigation}) => {
  return {
    header: () => null
 } 
}

CategoriesScreen.navigationOptions = ({navigation}) => {
  return {
    header: () => null
 } 
}

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
      headerMode: 'none',
      visible: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-apps" color={tintColor} size={24} />
      )
    }
  },
  CompletedTasksScreen: {
    screen: CompletedTasksScreen,
    navigationOptions: {
      tabBarLabel: 'Completed Tasks',
      headerMode: 'none',
      visible: false,
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
  },
  TaskInformationScreen:  {
    screen: TaskInformationScreen,
    navigationOptions:{
      tabBarLabel: 'Task',
    }
  }
})

CreateTaskScreen.navigationOptions = ({navigation}) => {
  return {
    header: () => null
 } 
}

ResetPasswordScreen.navigationOptions = ({navigation}) => {
  return {
    header: () => null
 } 
}

TaskInformationScreen.navigationOptions = ({navigation}) => {
  return {
    header: () => null
 } 
}

SignUpScreen.navigationOptions = ({navigation}) => {
  return {
    header: () => null
 } 
}

AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle = routeName.replace('Screen', ' ');
  // return {
  //   headerTitle,
  // };

  return {
      header: () => null
  };
};


export default createSwitchNavigator({
  Auth: AuthStackNavigator,
  App: AppStackNavigator,
  

})