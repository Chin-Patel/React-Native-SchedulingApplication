import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Title } from 'native-base';
export default class CategoriesScreen extends Component {

    constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
        <Header  style={styles.header}>
          <Body>
            <Title style={styles.title}>Categories</Title>
          </Body>
        </Header>
        </Content>
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