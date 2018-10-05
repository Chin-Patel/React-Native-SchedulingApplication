import React from 'react';
import { Root } from 'native-base'
import { StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Icon, ActionSheet, Textarea, Form, Item, Label, Input, Button, Left, Right } from 'native-base';
import DatePicker from 'react-native-datepicker'
import TaskProvider from './TaskProvider'
import CategoryProvider from './Providers/CategoryProvider'
import {taskIsValid} from './Helper/Validator'
import {sortArrayOfNames} from './Helper/Sorter'

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
            CategoryData: CategoryProvider.getInstance(),
            categorysToDisplay: [],
        }
        const { navigation } = this.props;
        this.state.id = navigation.getParam('userId', 'Default');
    }

    componentDidMount() {
        this.state.CategoryData.pullCategoriesAndSplit(this);
    }

    createTask() {
        this.state.TaskData.createTask(
            this.state.taskTitle, 
            this.state.taskDescription, 
            this.state.date, 
            this.state.clicked)
        // Update the category count
        this.state.CategoryData.updateCategoryCount(this.state.categoriesToRender, this.state.clicked, 'plus')
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
                                    options: this.state.categorysToDisplay,
                                    cancelButtonIndex: this.state.categorysToDisplay.indexOf('Default'),
                                    title: "Choose a category"
                                },
                                (buttonIndex) => {
                                    this.setState({ clicked: this.state.categorysToDisplay[buttonIndex] });
                                }
                            )}
                        >
                            <Text>{this.state.clicked}</Text>
                        </Button>

                        {taskIsValid(this.state.taskTitle, this.state.taskDescription) == true ? 
                            <Button transparent style={styles.buttonStyle}
                                full
                                rounded
                                onPress={this.createTask.bind(this)}
                            >
                                <Text style={{ color: 'white' }}> Create Task</Text>
                            </Button>
                            :
                            <Button disabled
                                full
                                rounded
                            >
                                <Text style={{ color: 'white' }}> Create Task</Text>
                            </Button>
        
                        }


                        
                    </Content>
                </Container>
            </Root>
        );
    }

    doMethod() {
        //alert("HMMMM " + this.state.clicked);
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
