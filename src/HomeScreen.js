import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, FlatList } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'
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

  async deleteRow(secId, rowId, rowMap, data) {
    //alert(firebase.database().ref('userProfile/'+this.userId+'/tasksList/' + data.id));
    await firebase.database().ref('userProfile/'+this.userId+'/tasksList/' + data.id).remove();
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }


  loadCreateTaskScreen(){
    //alert(this.userId);
    this.props.navigation.navigate('CreateTaskScreen',{
      userId: this.userId
    });
    //alert("yah");
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
        <FAB buttonColor="#445df7" iconTextColor="white" onClickAction={() => {this.loadCreateTaskScreen()}} visible={true} iconTextComponent={<Text>+</Text>} />

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