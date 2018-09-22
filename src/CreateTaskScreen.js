import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
//https://www.npmjs.com/package/react-native-modal-datetime-picker
import DateTimePicker from 'react-native-modal-datetime-picker';


export default class CreateTaskScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = state = { email: '', password: '', errorMessage: null, isDateTimePickerVisible: false, date: '', id: ''}
        const { navigation } = this.props;
        this.state.id = navigation.getParam('userId', 'Default');
        alert(this.state.id);

    }

    createTask() {
        alert("hello " + this.state.id)
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   
    _handleDatePicked = (date) => {
      console.log('A date has been picked: ', date);
      //this.setState(date) = date;
      
      this._hideDateTimePicker();
      alert(date);
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
                    onChangeText={email => this.setState({ email })}
                //value={this.state.email}

                />
                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Add a description"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                    />
                </View>


                      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
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
