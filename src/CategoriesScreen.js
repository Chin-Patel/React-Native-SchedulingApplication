import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Title, Right, Icon, FormInput, Button, Input, Form, Item, ListItem, Footer } from 'native-base';
export default class CategoriesScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      laps: [{ headline: "Test", text: "Test text", send_at: "test date" },
      { headline: "Test2", text: "Test text2", send_at: "test date" },
      { headline: "Test3", text: "Test text3", send_at: "test date" }]
    };
  }

  lapsList() {

    return this.state.laps.map((data) => {
      return (
        <Card style={styles.card}>
          <CardItem style={styles.cardItem} header button onPress={() => this.showInformation(data)}>
            <Body>
              <Text>
                {data.headline}
              </Text>
              <Text>{data.text}</Text>
            </Body>
            <Right>
              <Icon name="close" onPress={(data) => this.showInformation(data)} />
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
          <Input placeholder='Create Category...' placeholderTextColor='grey' style={styles.input} />
          <Right>
            <Icon name="arrow-up" onPress={() => this.other()} style={styles.createIcon}></Icon>
          </Right>
        </Footer>
      </Container>
    )
  }

  other() {
    alert("yuhh");
  }

  showInformation(data) {
    alert(data.headline);
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