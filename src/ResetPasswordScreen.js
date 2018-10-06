import React from 'react';
import { StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { Container, Header, Content, Body, Text, Title, Icon, Item, Label, Form, Input, Button, Left } from 'native-base';

export default class ResetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errorMessage: null }
  }

  displayAlert() {
    Alert.alert(
      'Check your email!',
      'You should have recieved a link to change your password ',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
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
      <Container style={styles.container}>
        <Content>
          <Header style={styles.header}>
            <Left style={styles.headerLeft}>
              <Button transparent onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Reset Password</Title>
            </Body>
          </Header>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Button style={styles.buttonStyle}
              full
              rounded
              onPress={this.handleResetPassword}
            >
              <Text style={{ color: 'white' }}> Reset Password</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    backgroundColor: '#445df7',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',

  },
  signout: {
    color: 'red'
  },
  buttonStyle: {
    backgroundColor: "#445df7",
    margin: 10,
  },
  headerLeft: {
    flex: 0,
    paddingLeft: 6,
    width: 62
  }
})
