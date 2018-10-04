import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, FlatList } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Body, Left, Right, Title } from 'native-base'
import * as firebase from 'firebase';

//https://www.npmjs.com/package/react-native-fab

var data = []
var items = []
export default class CompletedTasksScreen extends React.Component {
  constructor(props) {
    super(props);
    var userId = "a";
    var tasksReference;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      listViewData: data,
      newContact: ""
    }

  }

  getTaskReference(){
    return this.tasksReference;
  }

  componentDidMount() {
    var that = this
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.tasksReference = firebase
        .database()
        .ref(`/userProfile/${user.uid}/completedTasksList`);
        this.userId = `${user.uid}`;
        this.tasksReference.on("value", tasksList => {
          this.items = [];
          tasksList.forEach(snap => {
            this.items.push({
              id: snap.key,
              taskTitle: snap.val().taskTitle,
              taskDescription: snap.val().taskDescription,
              taskCompletionTime: snap.val().taskCompletionTime,
            });
          });
          that.setState({ listViewData: this.items })
        });
      }
    });
  }

  addRow(data) {
    this.getTaskReference().push({
      taskTitle: data,
      taskDescription: "taskDescription",
    })
  }

  async deleteRow(secId, rowId, rowMap, data) {
    await firebase.database().ref('userProfile/'+this.userId+'/completedTasksList/' + data.id).remove();
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    this.setState({ listViewData: newData });
  }

  swap(secId, rowId, rowMap, data){
    firebase.database().ref('userProfile/'+this.userId+'/tasksList').push({
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      //taskDate: data.taskDate,
      //taskCategory: taskCategory,
      //taskCompletionTime: taskCompletionTime
    }).then(newEvent => {
      this.deleteRow(secId, rowId, rowMap, data);
    });
  }


  loadCreateTaskScreen(){
    this.props.navigation.navigate('CreateTaskScreen',{
      userId: this.userId
    });
  }

  showInformation(data) {
    this.props.navigation.navigate('TaskInformationScreen',{
      data: data,
      userId: this.userId
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
        <Header  style={styles.header}>
          <Body>
            <Title style={styles.title}>Completed Tasks</Title>
          </Body>
        </Header>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem onPress={() => this.showInformation(data)}>
              <Body>
              <Text style={styles.taskText}>{data.taskTitle}</Text>
              <Text note style = {styles.text}>{data.taskCompletionTime} </Text>       
              </Body> 
              </ListItem>
            }
            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name='trash'/>
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full success onPress={() => this.swap(secId, rowId, rowMap, data)}>
                <Icon name='swap' />
              </Button>
            }
            leftOpenValue={+75}
            rightOpenValue={-75}
          />
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
  taskText: {
    textDecorationLine: 'line-through',
    color: 'black',
    marginLeft: 10,
    marginRight: 10
  },
  text:{
    color: 'grey',
    marginLeft: 10,
    marginRight: 10
  },
  header:{
    backgroundColor: '#445df7',
    fontWeight: 'bold',

  },
  title:{
    fontWeight: 'bold',

  }
})