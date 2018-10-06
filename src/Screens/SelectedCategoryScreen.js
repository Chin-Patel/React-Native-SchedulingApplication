import React from 'react';
import { StyleSheet, Text, ListView, Image, Alert } from 'react-native';
import { Container, Content, Header, Button, Left, Icon, List, ListItem, Body, Title, Right, Spinner } from 'native-base'
import FAB from 'react-native-fab'
import CompleteTasksProvider from '../Providers/CompleteTasksProvider'
import CategoryProvider from '../Providers/CategoryProvider'
import TaskProvider from '../Providers/TaskProvider'
import SettingsProvider from '../Providers/SettingsProvider'

export default class SelectedCategory extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'Default');
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      category: data,
      listViewData: [],
      newContact: "",
      taskDelete: true,
      categoryDelete: true,
      categoriesToRender: [],
      loading: true,
      CompletedData: CompleteTasksProvider.getInstance(),
      CategoryData: CategoryProvider.getInstance(),
      TaskData: TaskProvider.getInstance(),
      SettingsData: SettingsProvider.getInstance()
    }
  }

  componentDidMount() {
    this.state.TaskData.pullSpecificTasks(this, this.state.category.categoryName);
    this.state.SettingsData.pullSettings(this);
    this.state.CategoryData.pullCategories(this, false, false);
  }

  deleteRow(secId, rowId, rowMap, data) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    this.setState({ listViewData: newData });
    this.state.TaskData.deleteTask(data);
    this.state.CategoryData.updateCategoryCount(this.state.categoriesToRender, data.taskCategory, 'minus')
  }

  throwAlert(secId, rowId, rowMap, data) {
    if (this.state.taskDelete == true) {
      Alert.alert(
        'Are you sure you want to delete?',
        'You wont be able to get it back',
        [
          { text: 'Cancel', onPress: () => console.log(''), style: 'cancel' },
          { text: 'OK', onPress: () => { this.deleteRow(secId, rowId, rowMap, data) } },
        ],
        { cancelable: false }
      )
    } else {
      this.deleteRow(secId, rowId, rowMap, data);
    }
  }

  completeTask(secId, rowId, rowMap, data) {
    this.state.CompletedData.completeTask(data);
    this.deleteRow(secId, rowId, rowMap, data);
  }

  loadCreateTaskScreen() {
    this.props.navigation.navigate('CreateTaskInCategoryScreen', {
      category: this.state.category.categoryName,
      data: this.state.data
    });
  }

  showInformation(data) {
    this.props.navigation.navigate('TaskInformationScreen', {
      data: data,
      categoriesList: this.state.categoriesToRender
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('CategoriesScreen')}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>{this.state.category.categoryName}</Title>
          </Body>
        </Header>
        {this.state.loading ? <Spinner color='blue' /> :
          <Content>
            {
              this.state.listViewData.length == 0 ?
                <Image style={styles.images} source={require('../../assets/imgs/Categorystate.jpg')} />
                :
                <List
                  enableEmptySections
                  dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                  renderRow={data =>
                    <ListItem onPress={() => this.showInformation(data)}>
                      <Body>
                        <Text style={styles.taskText}>{data.taskTitle}</Text>
                        <Text note style={styles.text}>{data.taskDescription}</Text>
                      </Body>
                    </ListItem>
                  }
                  renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full success onPress={() => this.completeTask(secId, rowId, rowMap, data)}>
                      <Icon name='checkmark' />
                    </Button>
                  }
                  renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={() => this.throwAlert(secId, rowId, rowMap, data)}>
                      <Icon name='trash' />
                    </Button>
                  }
                  leftOpenValue={+75}
                  rightOpenValue={-75}
                />
            }
          </Content>
        }
        <FAB buttonColor="#445df7" iconTextColor="white" onClickAction={() => { this.loadCreateTaskScreen() }} visible={true} iconTextComponent={<Text>+</Text>} />
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
  images: {
    width: '100%',
    height: 500
  },
  taskText: {
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: 'grey',
    paddingLeft: 10,
    paddingRight: 10
  },
})