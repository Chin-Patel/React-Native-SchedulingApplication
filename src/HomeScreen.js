import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, FlatList } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Body, Title } from 'native-base'
import * as firebase from 'firebase';
import FAB from 'react-native-fab'

//https://www.npmjs.com/package/react-native-fab

var data = []
var items = []
export default class HomeScreen extends React.Component {
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
        .ref(`/userProfile/${user.uid}/tasksList`);
        this.userId = `${user.uid}`;
        //alert("hellop " + `${user.uid}`);
        //alert("hmm " + this.tasksReference);
        this.tasksReference.on("value", tasksList => {
          this.items = [];
          tasksList.forEach(snap => {
            this.items.push({
              id: snap.key,
              taskTitle: snap.val().taskTitle,
              taskDescription: snap.val().taskDescription,
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

  getCompletetionTime() {
    var currentdate = new Date();
    var datetime = "Completed On " + currentdate.getDate() + "/" + (currentdate.getMonth() + 1)
      + "/" + currentdate.getFullYear() + " at "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes();
    return datetime;
  }

  async deleteRow(secId, rowId, rowMap, data) {
    //alert(firebase.database().ref('userProfile/'+this.userId+'/tasksList/' + data.id));
    await firebase.database().ref('userProfile/'+this.userId+'/tasksList/' + data.id).remove();
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });
  }

  completeTask(secId, rowId, rowMap, data){
    alert(this.getCompletetionTime());
    firebase.database().ref('userProfile/'+this.userId+'/completedTasksList').push({
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      //taskDate: data.taskDate,
      //taskCategory: taskCategory,
      taskCompletionTime: this.getCompletetionTime()
    }).then(newEvent => {
      this.deleteRow(secId, rowId, rowMap, data);
    });
  }


  loadCreateTaskScreen(){
    //alert(this.userId);
    this.props.navigation.navigate('CreateTaskScreen',{
      userId: this.userId
    });
    //alert("yah");
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
            <Title style={styles.title}>Your Tasks</Title>
          </Body>
        </Header>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem onPress={() => this.showInformation(data)}>
              <Body>
              <Text style={{fontWeight: "bold"}}>{data.taskTitle}</Text>
                <Text note>{data.taskDescription}</Text>
              </Body>
              </ListItem>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full secondary onPress={() => this.completeTask(secId, rowId, rowMap, data)}>
                <Icon name='checkmark'/>
              </Button>
            }
            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name='trash' />
              </Button>
            }
            leftOpenValue={+75}
            rightOpenValue={-75}
          />
        </Content>
        <FAB buttonColor="#445df7" iconTextColor="white" onClickAction={() => {this.loadCreateTaskScreen()}} visible={true} iconTextComponent={<Text>+</Text>} />

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
  header:{
    backgroundColor: '#445df7',
    fontWeight: 'bold',

  },
  title:{
    fontWeight: 'bold',

  }
  
})