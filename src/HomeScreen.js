import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, FlatList, Image, Alert } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Body, Title, Right, Spinner } from 'native-base'
import * as firebase from 'firebase';
import FAB from 'react-native-fab'
import CompleteTasksProvider from './Providers/CompleteTasksProvider'
import CategoryProvider from './Providers/CategoryProvider'
import TaskProvider from './TaskProvider'


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
      newContact: "",
      taskDelete: true,
      categoryDelete: true,
      categoriesToRender: data,
      loading: true,
      CompletedData: CompleteTasksProvider.getInstance(),
      CategoryData: CategoryProvider.getInstance(),
      TaskData: TaskProvider.getInstance(),
    }

  }

  getTaskReference() {
    return this.tasksReference;
  }

  componentDidMount() {
    var that = this

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.tasksReference = firebase
          .database()
          .ref(`/userProfile/${user.uid}/tasksList`);
        this.userId = `${user.uid}`;
        this.tasksReference.on("value", tasksList => {
          this.items = [];
          tasksList.forEach(snap => {
            this.items.push({
              id: snap.key,
              taskTitle: snap.val().taskTitle,
              taskDescription: snap.val().taskDescription,
              taskCategory: snap.val().taskCategory,
              taskDate: snap.val().taskDate
            });
          });
          that.setState({ listViewData: this.items })
          this.setState({ loading: false })
          this.loadSettings();
          this.loadCategories();
        });
      }
    });
  }

  loadSettings() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.tasksReference = firebase
          .database()
          .ref(`/userProfile/${user.uid}/settings`);
        this.userId = `${user.uid}`;
        this.tasksReference.on("value", tasksList => {
          tasksList.forEach(snap => {
            this.state.taskDelete = snap.val().taskDelete;
            this.state.categoryDelete = snap.val().categoryDelete;
          });
        });
      }
    });
  }


  loadCategories() {
    var that = this
    firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/').on("value", categories => {
      this.categoriesList = [];
      categories.forEach(snap => {
        this.categoriesList.push({
          id: snap.key,
          categoryCount: snap.val().categoryCount,
          categoryLetter: snap.val().categoryLetter,
          categoryName: snap.val().categoryName,
        });
      });
      that.setState({ categoriesToRender: this.categoriesList })
    });
  }



  deleteRow(secId, rowId, rowMap, data) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    this.setState({ listViewData: newData });
    this.state.TaskData.deleteTask(data);
    this.state.CategoryData.updateCategoryCount(this.state.categoriesToRender, data.taskCategory, 'minus')
  }


  throwAlert(secId, rowId, rowMap, data) {
    if (this.state.taskDelete == true) {
      Alert.alert(
        'Are you sure you want to delete?',
        'You wont be able to get it back',
        [
          { text: 'Cancel', onPress: () => console.log(''), style: 'cancel' },
          { text: 'OK', onPress: () => { this.deleteRow(secId, rowId, rowMap, data) } },
        ],
        { cancelable: false }
      )
    } else {
      this.deleteRow(secId, rowId, rowMap, data);
    }
  }


  completeTask(secId, rowId, rowMap, data) {
    this.state.CompletedData.completeTask(data);
    this.deleteRow(secId, rowId, rowMap, data);
  }

  loadCreateTaskScreen() {
    this.props.navigation.navigate('CreateTaskScreen', {
      userId: this.userId
    });
  }

  showInformation(data) {
    this.props.navigation.navigate('TaskInformationScreen', {
      data: data,
      userId: this.userId
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Your Tasks</Title>
          </Body>
        </Header>
        {this.state.loading ? <Spinner color='blue' /> :
          <Content>
            {
              this.state.listViewData.length == 0 ?
                <Image style={styles.images} source={require('../assets/imgs/emptyState1.png')} />
                :
                <List
                  enableEmptySections
                  dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                  renderRow={data =>
                    <ListItem icon onPress={() => this.showInformation(data)}>
                      <Body>
                        <Text style={styles.taskText}>{data.taskTitle}</Text>
                        <Text note style={styles.text}>{data.taskDescription}</Text>
                      </Body>

                      <Right>
                        <Icon name="md-arrow-forward" onPress={() => this.createCategory()} style={styles.createIcon}></Icon>
                      </Right>
                    </ListItem>
                  }
                  renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full success onPress={() => this.completeTask(secId, rowId, rowMap, data)}>
                      <Icon name='checkmark' />
                    </Button>
                  }
                  renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={() => this.throwAlert(secId, rowId, rowMap, data)}>
                      <Icon name='trash' />
                    </Button>
                  }
                  leftOpenValue={+75}
                  rightOpenValue={-75}
                />
            }
          </Content>
        }
        <FAB buttonColor="#445df7" iconTextColor="white" onClickAction={() => { this.loadCreateTaskScreen() }} visible={true} iconTextComponent={<Text>+</Text>} />
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
  images: {
    width: '100%',
    height: 500
  },
  taskText: {
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: 'grey',
    paddingLeft: 10,
    paddingRight: 10
  },

})