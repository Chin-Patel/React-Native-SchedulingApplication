import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as firebase from 'firebase';

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
    alert(this.state.data.taskTitle);
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

    updateTask(){
        this.state.saveState = "Saved";
        //alert(this.state.userId);
        alert(this.state.taskTitle);
        firebase.database().ref('userProfile/'+this.state.userId+'/tasksList/' + this.state.data.id).update({
            taskTitle: this.state.taskTitle,
            taskDescription: this.state.taskDescription,
            blah: "brah"
            //taskDate: this.state.data.taskDate,
        });
    }

    unsave(){
        this.state.saveState = "Save";
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
                    placeholder= {this.state.taskTitle}
                    onChangeText={taskTitle => {
                        this.setState({ taskTitle },
                        this.unsave()
                        )
                    }
                    }
                    value={this.state.taskTitle}

                />
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder={this.state.taskDescription}
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

                <Button title={this.state.saveState} onPress={this.updateTask.bind(this)} />
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