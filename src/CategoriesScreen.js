import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
export default class CategoriesScreen extends Component {

    constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header />
        <Content>
          <Card>
            <CardItem >
              <Body>
                <Text>
                   Work
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  card: {
    
  }
  
})