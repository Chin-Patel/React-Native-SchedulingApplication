import React from 'react';
import {StyleSheet, Text, View, TextInput, Image, ImageBackground } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Button, Item, Label, Icon } from 'native-base'

export default class LoginScreen extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);
        this.state =   state = { email: '', password: '', errorMessage: null }
      }


      handleLogin = () => {
        const { email, password } = this.state
        firebase
          .auth()
          .signInWithEmailAndPassword("test@test.com", "password")
          //.signInWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate('HomeScreen'))
          .catch(error => this.setState({ errorMessage: error.message }))
      }
      

      
  render() {
        return (
          <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                            //value={this.state.email}
                            value={"test@test.com"}
                        />

                    </Item>

                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            //value={this.state.password}
            value={"password"}
                        />
                    </Item>

           <Button style={styles.buttonStyle}
               full
               rounded
               //success
               onPress={this.handleLogin}
           >
                        <Text style={{ color: 'white' }}> Login</Text>
                    </Button>
                </Form>
                <Text style = {styles.textStyle} onPress={() => this.props.navigation.navigate('ResetPasswordScreen')}> Forgot Password? </Text>
                <Text style = {styles.textStyle} onPress={() => this.props.navigation.navigate('SignUpScreen')}> Create a new account </Text>
            </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10
  },
  buttonStyle: {
    backgroundColor: "#445df7",
    marginTop: 10
  },
  textStyle: {
    color: '#445df7',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',

  }
});
