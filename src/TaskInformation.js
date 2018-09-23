import React from 'react';
import { StyleSheet } from 'react-native';
//https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Icon, Textarea, Form, Item, Label, Input, Button, Left, Right } from 'native-base';
//https://www.npmjs.com/package/react-native-datepicker
import DatePicker from 'react-native-datepicker'


export default class TaskInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = state = {data: null, 
            saveState: "Saved", 
            userId: "", taskTitle: '', 
            taskDescription: '', 
            errorMessage: null, 
            isDateTimePickerVisible: false, 
            date: ''}
        const { navigation } = this.props;
        this.state.data = navigation.getParam('data', 'Default');
        this.state.userId = navigation.getParam('userId', '');
        this.state.taskTitle = this.state.data.taskTitle;
        this.state.taskDescription = this.state.data.taskDescription;
        this.state.taskDate = this.state.data.taskDate;
    }

    unsave(){
        this.state.saveState = "Save";
    }

    updateTask(){
        this.state.saveState = "Saved";
        firebase.database().ref('userProfile/'+this.state.userId+'/tasksList/' + this.state.data.id).update({
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            //taskDate: this.state.data.taskDate,
        });
    }

    createTask() {
        let taskTitle = this.state.taskTitle;
        let taskDescription = this.state.taskDescription;
        let taskDate = this.state.date;
        // let taskCategory = this.state.category;
        firebase.database().ref('userProfile/' + this.state.id + '/tasksList/').push({
            //taskCategory : taskCategory,
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
                    <Left style={styles.headerLeft}>
                    <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
                        <Body>
                            <Title style={styles.title}>Edit Task</Title>
                        </Body>


                    </Header>

                    <Form>
                        <Item floatingLabel>
                            <Label>Title</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                onChangeText={taskTitle => 
                                    this.setState({ taskTitle },
                                    this.unsave()
                                )}
                                value={this.state.taskTitle}
                            />
                        </Item>

                        <Item floatingLabel>
                            <Label>Details</Label>
                            <Input
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={taskDescription => 
                                    this.setState({ taskDescription },
                                    this.unsave()
                                )}
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
                        onDateChange={(date) => { 
                            this.setState({ date: date }),
                            this.unsave()
                         }}
                    />

                    <Button style={styles.buttonStyle}
                        full
                        rounded
                        onPress={this.updateTask.bind(this)}
                    >
                        <Text style={{ color: 'white' }}> {this.state.saveState}</Text>
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
    },
    headerLeft: {
        flex: 0,
        paddingLeft: 6,
        width: 62
    }
})
