import React from 'react';
import { Root } from 'native-base'

import { StyleSheet } from 'react-native';
//https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Icon, ActionSheet, Textarea, Form, Item, Label, Input, Button, Left, Right } from 'native-base';
//https://www.npmjs.com/package/react-native-datepicker
import DatePicker from 'react-native-datepicker'
var categoriesThing = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];

var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
//var DESTRUCTIVE_INDEX = 3;
//var CANCEL_INDEX = 4;
var data = []
var c = [];
export default class CreateTaskScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = state = {
            taskTitle: '',
            taskDescription: '',
            errorMessage: null,
            isDateTimePickerVisible: false,
            date: '',
            id: '',
            clicked: 'Default',
            categoriesToRender: data
        }
        const { navigation } = this.props;
        this.state.id = navigation.getParam('userId', 'Default');
    }

    componentDidMount() {
        var that = this    
        firebase.auth().onAuthStateChanged(user => {
          if(user){
            this.tasksReference = firebase
            .database()
            .ref(`/userProfile/${user.uid}/categoriesList`);
            this.userId = `${user.uid}`;
            //alert("hellop " + `${user.uid}`);
            //alert("hmm " + this.tasksReference);
            this.tasksReference.on("value", tasksList => {
              this.items = [];
              tasksList.forEach(snap => {
                this.items.push({
                    id: snap.key,
                    categoryName: snap.val().categoryName,
                    categoryCount: snap.val().categoryCount
                });
              });
              that.setState({ categoriesToRender: this.items })
              this.initArrays();
            });
          }
        });
      }


    initArrays(){
        c= [];
        for(let i = 0; i < this.state.categoriesToRender.length; i++){
            //alert(this.state.categoriesToRender[i].categoryName + " <-");
            c.push(this.state.categoriesToRender[i].categoryName);
        }

    }

    createTask() {
        //alert(this.state.clicked + " <-0 ")
        let taskTitle = this.state.taskTitle;
        let taskDescription = this.state.taskDescription;
        let taskDate = this.state.date;
        let taskCategory = this.state.clicked;
        // let taskCategory = this.state.category;
        firebase.database().ref('userProfile/' + this.state.id + '/tasksList/').push({
            //taskCategory : taskCategory,
            //tasting: "wtf",
            taskDate: "" + taskDate,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            taskCategory: taskCategory
        }).then(()=>{
            this.updateCategoryCount();
            this.props.navigation.navigate('HomeScreen')
         }
            );
    }

    updateCategoryCount(){

        let newCategoryCount = this.getIncreaseCategoryCount(this.state.categoriesToRender, this.state.clicked);
        let categoryId = this.findCategoryId(this.state.categoriesToRender, this.state.clicked);
        alert("HI " + newCategoryCount + "  <-> " + categoryId);
        firebase.database().ref('userProfile/'+firebase.auth().currentUser.uid+'/categoriesList/' + categoryId).update({
            categoryCount : newCategoryCount
          });

    }

    findCategoryId(categoriesList, categoryName) {
        for (let i = 0; i < categoriesList.length; i++) {
          if (categoriesList[i].categoryName === categoryName) {
            return categoriesList[i].id;
          }
        }
      }

    getIncreaseCategoryCount(categoriesList, categoryName) {
        
        for (let i = 0; i < categoriesList.length; i++) {
          if (categoriesList[i].categoryName === categoryName) {
            let original = categoriesList[i].categoryCount;
            return original + 1;
          }
        }
        return 0;
      }

    render() {
        return (
            <Root>

                <Container style={styles.container}>
                    <Content>
                        <Header style={styles.header}>
                            <Body>
                                <Title style={styles.title}>Create A Task</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                                    <Icon name='close' />
                                </Button>
                            </Right>

                        </Header>

                        <Form>
                            <Item floatingLabel>
                                <Label>Title</Label>
                                <Input
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onChangeText={taskTitle => this.setState({ taskTitle })}
                                    value={this.state.taskTitle}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Details</Label>
                                <Input
                                    multiline={true}
                                    numberOfLines={5}
                                    onChangeText={taskDescription => this.setState({ taskDescription })}
                                    value={this.state.taskDescription}
                                    style={styles.textArea}
                                />
                            </Item>
                        </Form>
                        <DatePicker
                            style={styles.date}
                            date={this.state.date}
                            mode="date"
                            placeholder="Event Date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2001"
                            maxDate="31-12-2030"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            hideText={false}
                            customStyles={{
                                dateInput: {
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderTopWidth: 0,
                                    padding: 5,
                                    alignItems: 'flex-start'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />


                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: c,
                                        //options: BUTTONS,
                                        cancelButtonIndex: 2,
                                        //destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                        title: "Testing ActionSheet"
                                    },
                                    (buttonIndex) => {
                                        this.setState({ clicked: c[buttonIndex] });
                                        //this.doMethod();
                                        //alert("test: " + this.state.clicked)
                                    }
                                )}
                        >
                            <Text>{this.state.clicked}</Text>
                        </Button>
                        <Button style={styles.buttonStyle}
                            full
                            rounded
                            onPress={this.createTask.bind(this)}
                        >
                            <Text style={{ color: 'white' }}> Create Task</Text>
                        </Button>
                    </Content>
                </Container>
            </Root>
        );
    }

    doMethod(){
        alert("HMMMM " + this.state.clicked);
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
    text: {
        color: 'grey',
        marginLeft: 10,
        marginRight: 10
    },
    header: {
        backgroundColor: '#445df7',
        fontWeight: 'bold',

    },
    title: {
        fontWeight: 'bold',

    },
    buttonStyle: {
        backgroundColor: "#445df7",
        margin: 10,
    },
    textArea: {
        height: 200,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        textAlignVertical: "top"
    },
    date: {
        width: 200,
        marginLeft: 15,
        color: 'black'
    }
})
