import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, FlatList } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'
import * as firebase from 'firebase';


var data = []
var items = []
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    var userId = "a";
    var tasksReference;

    console.log("heloooo000");
    //alert("hello" + userId);
    //alert("hmm " + this.tasksReference);
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
          alert("pls" + this.items.length);
          that.setState({ listViewData: this.items })
        });
      }
    });




    // var ref = this.getTaskReference();
    // var that = this
    // //alert("Right path: " + firebase.database().ref('/userProfile/' + this.userId + '/tasksList'));
    // await alert("Left path: " + this.getTaskReference());
    // await firebase.database().ref('/userProfile/' + this.userId + '/tasksList').on('child_added', function (data) {

    //   var newData = [...that.state.listViewData]
    //   newData.push(data)
    //   that.setState({ listViewData: newData })
    //   alert("=>" + this.newData.length);
    // })

    // ref.on("child_added", function(snapshot) {
    //   alert("=> " + snapshot.key);
    // });

    // this.getTaskReference().once("value", tasksList => {
    //   this.items = [];
    //   tasksList.forEach(snap => {
    //     this.items.push({
    //       id: snap.key,
    //       taskTitle: snap.val().taskTitle,
    //       taskDescription: snap.val().taskDescription,
    //       taskDate: snap.val().taskDate,
    //       taskCategory: snap.val().taskCategory
    //     });
    //   });
    //   alert("Size is " + this.items.length);
    // });

    // var that = this
    // this.getTaskReference().on('child_added', function (data) {

    // //this.getTaskReference().on('child_added', function (data) {

    // //firebase.database().ref('/contacts').on('child_added', function (data) {

    //   var newData = [...that.state.listViewData]
    //   newData.push(data)
    //   that.setState({ listViewData: newData })

    // })

  }

  addRow(data) {
    // alert("test " + this.userId);
    // var key = firebase.database().ref('/contacts').push().key
    // firebase.database().ref('/contacts').child(key).set({ name: data })
    this.getTaskReference().push({
      taskTitle: data,
      taskDescription: "taskDescription",
    })
  }

  async deleteRow(secId, rowId, rowMap, data) {

    await firebase.database().ref('contacts/' + data.key).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  showInformation() {

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Content>
            <Item>
              <Input
                onChangeText={(newContact) => this.setState({ newContact })}
                placeholder="Add name"
              />
              <Button onPress={() => this.addRow(this.state.newContact)}>
                {/* <Icon name="add" /> */}
                <Text>OO</Text>
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text>{data.taskTitle}</Text>
                {/* <Text> {data.val().name}</Text> */}
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full>
                {/* <Icon name="information-circle" /> */}
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                {/* <Icon name="trash" /> */}
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
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})