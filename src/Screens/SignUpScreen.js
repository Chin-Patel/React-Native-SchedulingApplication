import React from 'react';
import { StyleSheet } from 'react-native'
import * as firebase from 'firebase';
import { Container, Header, Content, Body, Text, Title, Icon, Item, Label, Form, Input, Button, Left } from 'native-base';
import SettingsProvider from '../Providers/SettingsProvider'
import CategoryProvider from '../Providers/CategoryProvider'


export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', 
            password: '', 
            errorMessage: null,
            CategoryData: CategoryProvider.getInstance(),
            SettingsData: SettingsProvider.getInstance(),
          }

  }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.state.CategoryData.createCategory('Default');
        this.state.CategoryData.createCategory("Home");
        this.state.CategoryData.createCategory("Work");
        this.state.CategoryData.createCategory("Travel");
        this.state.CategoryData.createCategory("Important");
        this.state.SettingsData.getReference().push({
          taskDelete: true,
          categoryDelete: true,
        })
        this.props.navigation.navigate('LoginScreen')
      })
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
              <Title style={styles.title}>Create An Account</Title>
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
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
            <Button style={styles.buttonStyle}
              full
              rounded
              onPress={this.handleSignUp}
            >
              <Text style={{ color: 'white' }}> Create Account</Text>
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
