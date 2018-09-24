import React from 'react';
import { StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { Container, Header, Content, Body, Text, Title, Icon, Item, Label, Input, Button, List, ListItem, Switch, Right } from 'native-base';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    var userId = "a";

    this.state = state = { id: '', taskDelete: true, categoryDelete: true }
    //const { navigation } = this.props;
    //this.state.id = navigation.getParam('userId', 'Default');
  }

  updateSettings() {
    //alert(firebase.database().ref('userProfile/' + this.userId + '/settings/' + this.state.id));
    let toUp;
    if(this.state.taskDelete == true){
      toUp = false;
    }else{
      toUp = true;
    }
    firebase.database().ref('userProfile/' + this.userId + '/settings/' + this.state.id).update({
      taskDelete: toUp ,
      categoryDelete: this.state.categoryDelete,
    });
  }

  componentDidMount() {
    var that = this
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.tasksReference = firebase
        .database()
        .ref(`/userProfile/${user.uid}/settings`);
        this.userId = `${user.uid}`;
        var taskDelete;
        var categoryDelete;
        this.tasksReference.on("value", tasksList => {
          tasksList.forEach(snap => {
            this.state.id = snap.key;
            taskDelete = snap.val().taskDelete;
            categoryDelete = snap.val().categoryDelete;
          });
        });
        
        that.setState({ taskDelete: taskDelete })
        that.setState({ categoryDelete: categoryDelete })
      }
    });
  }

  render() {

    return (

      <Container style={styles.container}>
        <Content>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.title}>Settings</Title>
            </Body>
          </Header>
          <List>
            <ListItem itemDivider>
              <Text>Manage Account</Text>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Account Details</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.signout} onPress={() => this.props.navigation.navigate('LoginScreen')}>Sign Out</Text>
              </Body>
            </ListItem>
            <ListItem itemDivider>
              <Text>General</Text>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Task Deletion Confirmation</Text>
              </Body>
              <Right>
                <Switch value={this.state.taskDelete}
                  onValueChange={taskDelete => {
                    this.setState({ taskDelete }),
                    this.updateSettings()
                  }}
                  value={this.state.taskDelete}
                />
              </Right>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Category Deletion Confirmation</Text>
              </Body>
              <Right>
                <Switch
                  onValueChange={categoryDelete => 
                    this.setState({ categoryDelete })}
                  value={this.state.categoryDelete}
                />
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>About</Text>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Version 1.1-demo</Text>
              </Body>
            </ListItem>
          </List>
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
  }
})
