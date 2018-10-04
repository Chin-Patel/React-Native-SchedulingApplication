import React from 'react';
import { Root } from 'native-base'
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Icon, ActionSheet, Textarea, Form, Item, Label, Input, Button, Left, Right } from 'native-base';

export default class ViewCompletedTaskScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = state = {
            task: '',
        }
        const { navigation } = this.props;
        this.state.task = navigation.getParam('task', 'Default');
    }

    render() {
        return (
            <Root>
                <Container style={styles.container}>
                    <Header style={styles.header}>
                        <Body>
                            <Title style={styles.title}>{this.state.task.taskTitle}</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate('CompletedTasksScreen')}>
                                <Icon name='close' />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        This task has been completed
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>

                        <Form>
                            <Item floatingLabel>
                                <Label>Title</Label>
                                <Input
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    disabled
                                    value={this.state.task.taskTitle}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Details</Label>
                                <Input
                                    multiline={true}
                                    numberOfLines={4}
                                    value={this.state.taskDescription}
                                    style={styles.textArea}
                                    disabled
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Event Date</Label>
                                <Input
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    disabled
                                    value={this.state.task.taskDate}
                                />
                            </Item>

                            <Item floatingLabel>
                                <Label>Category</Label>
                                <Input
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    disabled
                                    value={this.state.task.taskCategoru}
                                />
                            </Item>
                        </Form>
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
})
