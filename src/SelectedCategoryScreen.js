import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, FlatList, Image, Alert } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Body, Title, Left } from 'native-base'
import * as firebase from 'firebase';
import FAB from 'react-native-fab'


var data
export default class SelectedCategory extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'Default');
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = { 
      category: data,
      listViewData: data,
     };
    //alert(data.categoryName);

  }

  componentDidMount() {
    //get all the items
    var that = this;
    firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/tasksList/').on("value", eventListSnapshot => {
      this.categoryItems = [];
      eventListSnapshot.forEach(snap => {
        if(snap.val().taskCategory.toLowerCase() === this.state.category.categoryName.toLowerCase()){
          this.categoryItems.push({
          id: snap.key,
          taskTitle: snap.val().taskTitle,
          taskDescription: snap.val().taskDescription,
          taskDate: snap.val().taskDate,
          taskCategory: snap.val().taskCategory
        });
        }
      });
      that.setState({ listViewData: this.categoryItems })
      alert(this.categoryItems.length);
    });
  }


  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={styles.header}>
            <Left style={styles.headerLeft}>
              <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>{this.state.category.categoryName}</Title>
            </Body>
          </Header>
          <List
            
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem onPress={() => this.showInformation(data)}>
              <Body>
              <Text style={styles.taskText }>{data.taskTitle}</Text>
                <Text note style={styles.text}>{data.taskDescription}</Text>
              </Body>
              </ListItem>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full success onPress={() => this.completeTask(secId, rowId, rowMap, data)}>
                <Icon name='checkmark'/>
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
        </Content>
        <FAB buttonColor="#445df7" iconTextColor="white" onClickAction={() => {this.loadCreateTaskScreen()}} visible={true} iconTextComponent={<Text>+</Text>} />
      </Container>
    );
  }

  loadCreateTaskScreen(){
    this.props.navigation.navigate('CreateTaskInCategoryScreen',{
      userId: this.userId
    });
  }

  


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#445df7',
    fontWeight: 'bold',

  },
  title: {
    fontWeight: 'bold',
  },
  headerLeft: {
    flex: 0,
    paddingLeft: 6,
    width: 62
  }
})