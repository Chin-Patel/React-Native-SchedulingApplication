import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Button, Item, Label, Icon, Textarea } from 'native-base'

export default class LoginScreen extends React.Component {
    static navigatorStyle = {
        tabBarHidden: true
    };
    constructor(props) {
        super(props);
        this.state = state = { email: '', password: '', errorMessage: null }
    }


    handleLogin = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword("test@test.com", "123456")
            //.signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('HomeScreen'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }



    render() {
        return (

            <Container style={styles.container}>
                <ImageBackground source={require('../assets/imgs/bg.jpg')} style={{ width: '100%', height: '100%' }}>

                    {/* <Image source={require('../assets/imgs/D.png')} />; */}
                    <Image style={styles.images} source={require('../assets/imgs/A.png')} />
                    <Form>
                        <Item floatingLabel>

                            <Label>Email</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                //placeholder="Email"
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
                                //placeholder="Password"
                                onChangeText={password => this.setState({ password })}
                                //value={this.state.password}
                            value={"123456"}
                            />
                        </Item>

                        {this.state.errorMessage &&
                            <Text style={styles.errorMessage}>
                                {this.state.errorMessage}
                            </Text>}

                        <Button style={styles.buttonStyle}
                            full
                            rounded
                            //success
                            onPress={this.handleLogin}
                        >
                            <Text style={{ color: 'white' }}> Login</Text>
                        </Button>
                    </Form>

                    <Text style={styles.textStyle} onPress={() => this.props.navigation.navigate('ResetPasswordScreen')}> Forgot Password? </Text>
                    <Text style={styles.textStyle} onPress={() => this.props.navigation.navigate('SignUpScreen')}> Create a new account </Text>

                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: "#445df7",
        margin: 10,
    },
    textStyle: {
        color: '#445df7',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    images: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    errorMessage: {
        color: 'red',
        justifyContent: 'center',
        alignSelf: 'center',

    }
});
