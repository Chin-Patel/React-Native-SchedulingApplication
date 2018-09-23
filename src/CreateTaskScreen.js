import React from 'react';
import { StyleSheet } from 'react-native';
//https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Icon, Textarea, Form, Item, Label, Input, Button, Left, Right } from 'native-base';
//https://www.npmjs.com/package/react-native-datepicker
import DatePicker from 'react-native-datepicker'


export default class CreateTaskScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = state = { taskTitle: '', taskDescription: '', errorMessage: null, isDateTimePickerVisible: false, date: '', id: '' }
        const { navigation } = this.props;
        this.state.id = navigation.getParam('userId', 'Default');
    }

    createTask() {
        let taskTitle = this.state.taskTitle;
        let taskDescription = this.state.taskDescription;
        let taskDate = this.state.date;
        // let taskCategory = this.state.category;
        firebase.database().ref('userProfile/' + this.state.id + '/tasksList/').push({
            //taskCategory : taskCategory,
            tasting: "wtf",
            taskDate: "" + taskDate,
            taskTitle: taskTitle,
            taskDescription: taskDescription
        }).then(this.props.navigation.navigate('HomeScreen'));
    }

    render() {
        return (
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

                    <Button style={styles.buttonStyle}
                        full
                        rounded
                        onPress={this.createTask.bind(this)}
                    >
                        <Text style={{ color: 'white' }}> Create Task</Text>
                    </Button>
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
