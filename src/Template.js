import React from 'react';
import { View, Text } from 'react-native';

export default class Template extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Hi there {global.username}</Text>
        <Text>This is more dummy text</Text>
        <Text>Contrary to popular belief, Lorem Ipsum is not simply random text. It has 
          roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</Text>
      </View>
    );
  }
}
