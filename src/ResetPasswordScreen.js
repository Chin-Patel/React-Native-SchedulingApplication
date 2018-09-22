import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import * as firebase from 'firebase';

export default class ResetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errorMessage: null }

  }

  displayAlert(){
    Alert.alert(
        'Check your email!',
        'Welcome to Swen325 Start App ',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
  }

  handleResetPassword = () => {
    const { email } = this.state
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(this.displayAlert())
      .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
    return (
    <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Enter Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Button title="ResetPassword" onPress={this.handleResetPassword} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInput: {
      height: 40,
      width: '90%',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 8
    }
  })