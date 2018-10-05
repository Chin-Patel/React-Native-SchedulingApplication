import React from 'react';
import { StyleSheet, Text, ListView } from 'react-native';
import { Container, Content, Header, Button, Icon, List, ListItem, Body, Title, Spinner } from 'native-base'
import CompleteTasksProvider from './Providers/CompleteTasksProvider'
import TaskProvider from './TaskProvider'
import CategoryProvider from './Providers/CategoryProvider'

var data = []
export default class CompletedTasksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      listViewData: data,
      newContact: "",
      CompletedData: CompleteTasksProvider.getInstance(),
      TaskData: TaskProvider.getInstance(),
      CategoryData: CategoryProvider.getInstance(),
      categoriesToRender: data,
      loading: true,
    }
  }

  componentDidMount() {
    this.state.CompletedData.pullCompletedTasks(this);
    this.state.CategoryData.pullCategories(this);
  }


  deleteRow(secId, rowId, rowMap, data) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    this.setState({ listViewData: newData });
    this.state.CompletedData.deleteCompletedTask(data);
  }

  swap(secId, rowId, rowMap, data){
    this.state.TaskData.createTask(
      data.taskTitle,
      data.taskDescription,
      data.taskDate,
      data.taskCategory
    );
    this.deleteRow(secId, rowId, rowMap, data);
    this.state.CompletedData.updateCategoryCount(this.state.categoriesToRender, data.taskCategory);
  }

  showInformation(task) {
    this.props.navigation.navigate('ViewCompletedTaskScreen', {
      task: task
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header  style={styles.header}>
          <Body>
            <Title style={styles.title}>Completed Tasks</Title>
          </Body>
        </Header>
        {this.state.loading ? <Spinner color='#445df7' /> :
        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem onPress={() => this.showInformation(data)}>
              <Body>
              <Text style={styles.taskText}>{data.taskTitle}</Text>
              <Text note style = {styles.text}>{data.taskCompletionTime} </Text>       
              </Body> 
              </ListItem>
            }
            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name='trash'/>
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full success onPress={() => this.swap(secId, rowId, rowMap, data)}>
                <Icon name='swap' />
              </Button>
            }
            leftOpenValue={+75}
            rightOpenValue={-75}
          />
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
  taskText: {
    textDecorationLine: 'line-through',
    color: 'black',
    marginLeft: 10,
    marginRight: 10
  },
  text:{
    color: 'grey',
    marginLeft: 10,
    marginRight: 10
  },
  header:{
    backgroundColor: '#445df7',
    fontWeight: 'bold',

  },
  title:{
    fontWeight: 'bold',
  }
})