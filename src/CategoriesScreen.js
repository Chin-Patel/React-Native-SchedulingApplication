import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Right, Icon, Input, Footer, Spinner } from 'native-base';
import { sortCategoryNames } from './Helper/Sorter'
import CategoryProvider from './Providers/CategoryProvider'
import { categoryIsValid } from './Helper/Validator'
var data = []

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      inputText: '',
      categoriesToRender: data,
      CategoryData: CategoryProvider.getInstance(),
      categoryDelete: true,
      loading: true
    };
  }

  createCategory() {
    this.state.CategoryData.createCategory(this.state.categoryName);
    this.state.categoryName = ''
  }

  deleteCategory(category) {
    if (this.state.categoryDelete == true) {
      Alert.alert(
        'Are you sure you want to delete the category?',
        'All the tasks inside will be deleted',
        [
          { text: 'Cancel', onPress: () => console.log(''), style: 'cancel' },
          { text: 'OK', onPress: () => { this.state.CategoryData.deleteCategory(category) } },
        ],
        { cancelable: false }
      )
    } else {
      this.state.CategoryData.deleteCategory(category);
    }
  }

  componentDidMount() {
    var that = this
    firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/').on("value", categories => {
      this.categoriesList = [];
      categories.forEach(snap => {
        this.categoriesList.push({
          categoryKey: snap.key,
          categoryCount: snap.val().categoryCount,
          categoryLetter: snap.val().categoryLetter,
          categoryName: snap.val().categoryName,
        });
      });
      that.setState({ categoriesToRender: sortCategoryNames(this.categoriesList) })
      this.loadSettings();
      this.setState({ loading: false })
    });
  }

  loadSettings() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.tasksReference = firebase
          .database()
          .ref(`/userProfile/${user.uid}/settings`);
        this.userId = `${user.uid}`;
        this.tasksReference.on("value", settings => {
          settings.forEach(snap => {
            this.state.categoryDelete = snap.val().categoryDelete;
          });
        });
      }
    });
  }



  openCategory(data) {
    this.props.navigation.navigate('SelectedCategoryScreen', {
      data: data
    });
  }

  lapsList() {
    return this.state.categoriesToRender.map((data) => {
      return (
        <Card style={styles.card}>
          <CardItem style={styles.cardItem} header button onPress={() => this.openCategory(data)}>
            <Body>
              <Text>
                {data.categoryName}
              </Text>
              <Text>{data.categoryCount} Items</Text>
            </Body>
            <Right>
              <Icon name="close" onPress={() => this.deleteCategory(data)} />
            </Right>
          </CardItem>
        </Card>
      );
    })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.title}>Categories</Title>
          </Body>
        </Header>
        {this.state.loading ? <Spinner color='#445df7' /> :
          <Content>
            {this.lapsList()}
            <Content>

            </Content>
          </Content>
        }
        <Footer style={styles.footer}>
          <Input
            placeholder='Create Category...'
            placeholderTextColor='grey'
            style={styles.input}
            onChangeText={categoryName => this.setState({ categoryName })}
            value={this.state.categoryName}
          />
          <Right>
            {categoryIsValid(this.state.categoryName, this.state.categoriesToRender) == true ?
              <Icon name="arrow-up" onPress={() => this.createCategory()} style={styles.createIcon}></Icon>
              :
              <Icon name="arrow-up" style={styles.createIconDisabled}></Icon>
            }
          </Right>
        </Footer>
      </Container>
    )
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
  card: {
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    elevation: 5
  },
  cardItem: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  header: {
    backgroundColor: '#445df7',
    fontWeight: 'bold',

  },
  title: {
    fontWeight: 'bold',

  },
  content: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0
  },
  input: {
    marginLeft: 10,
  },
  footer: {
    backgroundColor: 'white'
  },
  createIcon: {
    marginRight: 10,
  },
  createIconDisabled: {
    marginRight: 10,
    color: '#808080'
  }
})