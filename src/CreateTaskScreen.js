import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
//https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';
import {  Icon,  } from 'native-base'
//https://www.npmjs.com/package/react-native-datepicker
import DatePicker from 'react-native-datepicker'


export default class CreateTaskScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = state = { taskTitle: '', taskDescription: '', errorMessage: null, isDateTimePickerVisible: false, date: '', id: ''}
        const { navigation } = this.props;
        this.state.id = navigation.getParam('userId', 'Default');
        alert(this.state.id);

    }

    createTask() {
        let taskTitle = this.state.taskTitle;
        let taskDescription = this.state.taskDescription;
        let taskDate = this.state.date;
        // let taskCategory = this.state.category;
        //alert(taskDate);
        firebase.database().ref('userProfile/'+this.state.id+'/tasksList/').push({
            //taskCategory : taskCategory,
            tasting : "wtf",
            taskDate : "" + taskDate,
            taskTitle: taskTitle,
            taskDescription: taskDescription
        }).then(this.props.navigation.navigate('HomeScreen'));

        //For future reference



        //push to firebase
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Create task</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Title"
                    onChangeText={taskTitle => this.setState({ taskTitle })}
                    value={this.state.taskTitle}

                />
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Add a description"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={taskDescription => this.setState({ taskDescription })}
                         value={this.state.taskDescription}
                    />
                </View>
       <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-2001"
        maxDate="31-12-2030"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

                <Button title="Create Task" onPress={this.createTask.bind(this)} />
            </View>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    textAreaContainer: {
        borderWidth: 1,
        padding: 5,
        width: '90%',
        borderColor: 'gray',

    },
    textArea: {
        height: 150,
        width: '90%',
        borderColor: 'gray',
        //justifyContent: "flex-start"
    }
})
