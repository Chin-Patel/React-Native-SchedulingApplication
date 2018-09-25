import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Item, Button, Label, Icon, List, ListItem, Body, Title, Left } from 'native-base'

export default class SelectedCategory extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'Default');
    this.state = { category: data };
    //alert(data.categoryName);

  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={styles.header}>
            <Left style={styles.headerLeft}>
              <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>{this.state.category.categoryName}</Title>
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
  header: {
    backgroundColor: '#445df7',
    fontWeight: 'bold',

  },
  title: {
    fontWeight: 'bold',
  },
  headerLeft: {
    flex: 0,
    paddingLeft: 6,
    width: 62
}
})