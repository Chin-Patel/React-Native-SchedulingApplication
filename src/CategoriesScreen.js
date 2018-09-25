import React, { Component } from 'react';
import * as firebase from 'firebase';

import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Right, Icon, FormInput, Button, Input, Form, Item, ListItem, Footer } from 'native-base';

var data = []

export default class CategoriesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: '', inputText: '', categoriesToRender: data
    };
  }

  createCategory() {
    //this.state.inputText = '';
    firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/').push({
      categoryName: this.state.categoryName,
      categoryCount: 0,
      categoryLetter: this.state.categoryName.substring(0, 1).toUpperCase()
    }).then(this.state.categoryName = '');//TODO then what??
  }

  deleteCategory(category){
    alert("weeeee " + category.categoryKey + " " + category.categoryName);
    firebase.database().ref('userProfile/' + firebase.auth().currentUser.uid + '/categoriesList/' + category.categoryKey).remove();
  }

  componentDidMount() {
    var that = this
    //alert(firebase.auth().currentUser.uid);
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
      that.setState({ categoriesToRender: this.categoriesList })
    });
  }





  lapsList() {
    return this.state.categoriesToRender.map((data) => {
      return (
        <Card style={styles.card}>
          <CardItem style={styles.cardItem} header button onPress={() => this.showInformation(data)}>
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
        <Content>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.title}>Categories</Title>
            </Body>
          </Header>
          {this.lapsList()}
          <Content>
          </Content>
        </Content>
        <Footer style={styles.footer}>
          <Input
            placeholder='Create Category...'
            placeholderTextColor='grey'
            style={styles.input}
            onChangeText={categoryName => this.setState({ categoryName })}
            value={this.state.categoryName}
          />
          <Right>
            <Icon name="arrow-up" onPress={() => this.createCategory()} style={styles.createIcon}></Icon>
          </Right>
        </Footer>
      </Container>
    )
  }


  showInformation(data) {
    alert(data.categoryName);
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
    marginRight: 10
  }
})