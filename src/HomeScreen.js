import React from 'react';
import { View, Text, Alert } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'Default');

    Alert.alert(
      'Welcome!',
      'Welcome to Swen325 Start App ' + username,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome to SWEN325 Start App!</Text>
        <Text>You must be:  
          <Text style={{fontWeight: 'bold'}}>
            {username}
          </Text>
          !
        </Text>
      </View>
    );
  }
}