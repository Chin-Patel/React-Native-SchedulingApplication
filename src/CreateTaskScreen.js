import React from 'react';
import { Root } from 'native-base'

import { StyleSheet } from 'react-native';
//https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Icon, ActionSheet, Textarea, Form, Item, Label, Input, Button, Left, Right } from 'native-base';
//https://www.npmjs.com/package/react-native-datepicker
import DatePicker from 'react-native-datepicker'
import TaskProvider from './TaskProvider'
import CategoryProvider from './Providers/CategoryProvider'
import helpme from './Helper/Helper'
import {findCategoryId, getIncreaseCategoryCount} from './Helper/CategoryUpdater'
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
            categoriesToRender: data,
            TaskData: TaskProvider.getInstance(),
            CategoryData: CategoryProvider.getInstance()
        }
        const { navigation } = this.props;
        this.state.id = navigation.getParam('userId', 'Default');
        //helpme();
    }

    componentDidMount() {
        var that = this
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.tasksReference = firebase
                    .database()
                    .ref(`/userProfile/${user.uid}/categoriesList`);
                this.userId = `${user.uid}`;
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


    initArrays() {
        c = [];
        for (let i = 0; i < this.state.categoriesToRender.length; i++) {
            c.push(this.state.categoriesToRender[i].categoryName);
        }

    }

    createTask() {
        this.state.TaskData.createTask(
            this.state.taskTitle, 
            this.state.taskDescription, 
            this.state.date, 
            this.state.clicked)
        // Update the category count
        this.state.CategoryData.updateCategoryCount(this.state.categoriesToRender, this.state.clicked)
        this.props.navigation.navigate('HomeScreen');
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
                                    alignItems: 'flex-start',
                                },
                                placeholderText: {
                                    color: '#234456'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <Button full transparent dark style={styles.categoryButton} onPress={() =>
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
                        <Button transparent style={styles.buttonStyle}
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

    doMethod() {
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
        width: '100%',
        marginLeft: 15,
        marginTop: 10,
        marginRight: 15,
        color: 'black'
    },
    categoryButton: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        justifyContent: "flex-start"
    }
})
