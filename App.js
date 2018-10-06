import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeScreen from './src/Screens/HomeScreen';
import LoginScreen from './src/Screens/LoginScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import ResetPasswordScreen from './src/Screens/ResetPasswordScreen';
import CompletedTasksScreen from './src/Screens/CompletedTasksScreen';
import SettingsScreen from './src/Screens/SettingsScreen';
import CreateTaskScreen from './src/Screens/CreateTaskScreen';
import TaskInformationScreen from './src/Screens/TaskInformation';
import SelectedCategoryScreen from './src/Screens/SelectedCategoryScreen';
import CreateTaskInCategoryScreen from './src/Screens/CreateTaskInCategoryScreen';
import ViewCompletedTaskScreen from './src/Screens/ViewCompletedTaskScreen';
import CategoriesScreen from './src/Screens/CategoriesScreen';
import * as firebase from 'firebase';
import { Icon, } from 'native-base'

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
      header: null,
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null,
    }
  },
  ResetPasswordScreen: {
    screen: ResetPasswordScreen,
    navigationOptions: {
      header: null,
    }
  }
})


const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
      header: null,
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
      header: null,
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
      header: null,
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
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-settings" color={tintColor} size={24} />
      )
    }
  }
})

AppTabNavigator.navigationOptions = ({ navigation }) => {
  return {
    header: () => null
  };
};

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
  },
  CreateTaskScreen: {
    screen: CreateTaskScreen,
    navigationOptions: {
      tabBarLabel: 'Create Task',
      header: null
    }
  },
  TaskInformationScreen: {
    screen: TaskInformationScreen,
    navigationOptions: {
      tabBarLabel: 'Task',
      header: null
    }
  },
  SelectedCategoryScreen: {
    screen: SelectedCategoryScreen,
    navigationOptions: {
      tabBarLabel: 'SelectedCategoryScreen',
      header: null
    }
  },
  CreateTaskInCategoryScreen: {
    screen: CreateTaskInCategoryScreen,
    navigationOptions: {
      tabBarLabel: 'CreateTaskInCategoryScreen',
      header: null
    }
  },
  ViewCompletedTaskScreen: {
    screen: ViewCompletedTaskScreen,
    navigationOptions: {
      tabBarLabel: 'ViewCompletedTaskScreen',
      header: null
    }
  }
})

export default createSwitchNavigator({
  Auth: AuthStackNavigator,
  App: AppStackNavigator,
})