import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
//https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';


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

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   
    _handleDatePicked = (date) => {
      console.log('A date has been picked: ', date);
      //this.setState(date) = date;
      this.state.date = date;
      this._hideDateTimePicker();
      //alert(date);
    };

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


                      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked.bind(this)}
          onCancel={this._hideDateTimePicker.bind(this)}
        />
      </View>

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
