import React from 'react';
import { View, Text } from 'react-native';

export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);


  }
  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'Default');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello {global.username}</Text>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</Text>
      </View>
    );
  }
}