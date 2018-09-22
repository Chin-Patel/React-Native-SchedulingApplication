import React from 'react';
import {StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);
        this.state = { text: 'Enter Name' };
      }
      

      
  render() {
        return (
      <View style={styles.container}>
      <Text>What is your Nameee?</Text>
      <TextInput
      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(text) => this.setState({text})}
      placeholder = "enter here..."
      />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('HomeScreen',{
            username: this.state.text
          }
        )}
        />

        <Button
          title="Create new account"
          onPress={() => this.props.navigation.navigate('SignUpScreen',{
            username: this.state.text
          }
        )}
        />
      </View>
    );

  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  