import React from 'react';
import { Root } from 'native-base'
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Body, Text, Title, Icon, Form, Item, Label, Input, Button, Right } from 'native-base';
import DatePicker from 'react-native-datepicker'
import TaskProvider from './TaskProvider'
import CategoryProvider from './Providers/CategoryProvider'
import { taskIsValid } from './Helper/Validator'

export default class CreateTaskInCategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = state = {
            taskTitle: '',
            taskDescription: '',
            date: '',
            category: '',
            categoriesToRender: [],
            TaskData: TaskProvider.getInstance(),
            CategoryData: CategoryProvider.getInstance(),
            data: ''
        }
        const { navigation } = this.props;
        this.state.category = navigation.getParam('category', 'Default');
        this.state.data = navigation.getParam('data', 'Default');

    }

    componentDidMount() {
        this.state.CategoryData.pullCategories(this, false);
    }

    createTask() {
        this.state.TaskData.createTask(
            this.state.taskTitle,
            this.state.taskDescription,
            this.state.date,
            this.state.category)
        // Update the category count
        this.state.CategoryData.updateCategoryCount(this.state.categoriesToRender, this.state.category, 'plus')
        this.props.navigation.navigate('SelectedCategoryScreen', {
            data: this.state.data
        });

    }

    close() {
        this.props.navigation.navigate('SelectedCategoryScreen', {
            data: this.state.data
        });
    }



    render() {
        return (
            <Root>
                <Container style={styles.container}>
                    <Content>
                        <Header style={styles.header}>
                            <Body>
                                <Title style={styles.title}>{this.state.category}</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => this.close()}>
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
                        <Form>
                            <Item floatingLabel>
                                <Label>Category</Label>
                                <Input
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    disabled
                                    value={this.state.category}
                                    style={styles.text}
                                />
                            </Item>
                        </Form>

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
