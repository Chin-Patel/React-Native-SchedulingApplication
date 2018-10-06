import React from 'react';
import { Root } from 'native-base'
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Body, Text, Title, Icon, ActionSheet, Form, Item, Label, Input, Button, Right } from 'native-base';
import DatePicker from 'react-native-datepicker'
import TaskProvider from '../Providers/TaskProvider'
import CategoryProvider from '../Providers/CategoryProvider'

export default class TaskInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = state = {
            data: null,
            saveState: "Saved",
            taskTitle: '',
            taskDescription: '',
            taskDate: '',
            taskCategory: '',
            date: '',
            TaskData: TaskProvider.getInstance(),
            categoriesList: [],
            categorysToDisplay: [],
            CategoryData: CategoryProvider.getInstance(),
            currentCategory: '',
            oldCategory: ''
        }
        const { navigation } = this.props;
        this.state.data = navigation.getParam('data', 'Default');
        this.state.categoriesList = navigation.getParam('categoriesList', 'Default');
        this.populateCategoryNames();
        this.state.taskTitle = this.state.data.taskTitle;
        this.state.taskDescription = this.state.data.taskDescription;
        this.state.taskDate = this.state.data.taskDate;
        this.state.taskCategory = this.state.data.taskCategory;
        this.setState ({ oldCategory : this.state.taskCategory})
        this.state.oldCategory = this.state.taskCategory
    }

    populateCategoryNames() {
        this.setState({ categoriesList: [] })
        for (let i = 0; i < this.state.categoriesList.length; i++) {
            this.state.categorysToDisplay.push(this.state.categoriesList[i].categoryName);
        }
    }

    unsave() {
        //alert(this.state.taskCategory)
        this.setState({ saveState: "Save" })
    }

    updateTask() {
        this.setState({ saveState: "Saved" });
        this.state.TaskData.updateTask(this.state.taskTitle,
            this.state.taskDescription,
            this.state.taskDate,
            this.state.taskCategory,
            this.state.data,
        );
        
        //Update categories
        if (this.state.taskCategory != this.state.oldCategory) {
            this.state.CategoryData.updateCategoryCount(
                this.state.categoriesList,
                this.state.oldCategory,
                'minus'
            );
            this.state.CategoryData.updateCategoryCount(
                this.state.categoriesList,
                this.state.taskCategory,
                'plus'
            );
            this.state.oldCategory = this.state.taskCategory
        }
        this.props.navigation.navigate('HomeScreen')
    }

    render() {
        return (
            <Root>
                <Container style={styles.container}>
                    <Content>
                        <Header style={styles.header}>
                            <Body>
                                <Title style={styles.title}>Edit: {this.state.taskTitle}</Title>
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
                            date={this.state.taskDate}
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
                            onDateChange={(date) => {
                                this.setState({ taskDate: date }),
                                    this.unsave()
                            }} />
                        <Button full transparent dark style={styles.categoryButton} onPress={() =>
                            ActionSheet.show(
                                {
                                    options: this.state.categorysToDisplay,
                                    cancelButtonIndex: this.state.categorysToDisplay.indexOf('Default'),
                                    title: "Choose a category"
                                },
                                (buttonIndex) => {
                                        this.setState({ taskCategory: this.state.categorysToDisplay[buttonIndex] },
                                        this.unsave()
                                    );
                                }
                            )}
                        >
                            <Text>{this.state.taskCategory}</Text>
                        </Button>
                        <Button style={styles.buttonStyle}
                            full
                            rounded
                            onPress={this.updateTask.bind(this)}
                        >
                            <Text style={{ color: 'white' }}> {this.state.saveState}</Text>
                        </Button>
                    </Content>
                </Container>
            </Root>
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