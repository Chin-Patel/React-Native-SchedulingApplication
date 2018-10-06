import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Body, Text, Title, List, ListItem, Switch, Right, Spinner } from 'native-base';
import SettingsProvider from '../Providers/SettingsProvider'

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      taskDelete: null,
      categoryDelete: null,
      SettingsData: SettingsProvider.getInstance(),
      loading: true
    }
  }


  componentDidMount() {
    this.state.SettingsData.pullSettingsWithID(this);
  }

  updateTaskDelete() {
    this.state.SettingsData.updateTaskDelete(this.state.taskDelete, this.state.id)
  }

  updateCategoryDelete() {
    this.state.SettingsData.updateCategoryDelete(this.state.categoryDelete, this.state.id)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Settings</Title>
          </Body>
        </Header>
        {this.state.loading ? <Spinner color='#445df7' /> :
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>Manage Account</Text>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={styles.signout} onPress={() => this.props.navigation.navigate('LoginScreen')}>Sign Out</Text>
              </Body>
            </ListItem>
            <ListItem itemDivider>
              <Text>General</Text>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Task Deletion Confirmation</Text>
              </Body>
              <Right>
                <Switch value={this.state.taskDelete}
                  onValueChange={taskDelete => {
                    this.setState({ taskDelete }),
                      this.updateTaskDelete();
                  }}
                />
              </Right>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Category Deletion Confirmation</Text>
              </Body>
              <Right>
                <Switch value={this.state.categoryDelete}
                  onValueChange={categoryDelete => {
                    this.setState({ categoryDelete }),
                      this.updateCategoryDelete()
                  }}
                />
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>About</Text>
            </ListItem>
            <ListItem>
              <Body>
                <Text>Version 1.1-demo</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
        }
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
  header: {
    backgroundColor: '#445df7',
    fontWeight: 'bold',

  },
  title: {
    fontWeight: 'bold',

  },
  signout: {
    color: 'red'
  }
})
