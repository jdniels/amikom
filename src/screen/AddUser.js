//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import Database from '../database/database';
import {Header, Body, Title} from 'native-base';
const db = new Database();
// create a component
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: 'Ahmad',
      isLoading: false,
    };
  }

  saveUser = async () => {
    await this.setState({
      isLoading: true,
    });
    let user = {
      // userId: this.state.userId,
      userName: this.state.userName,
    };
    for (let i = 1; i <= 500; i++) {
      try {
        user.userId = i;
        const result = await db.createUser(user);

        if (result) {
          this.setState({isLoading: false});
        }
      } catch (error) {
        console.log(error);
        this.setState({
          isLoading: false,
        });
      }
    }
  };

  updateText = (text, field) => {
    // this.state[field] = text;
    console.log(text, 'Ke ganti');
    this.setState({
      [field]: text,
    });
  };

  render() {
    return (
      <>
      <Header>
        <Body>
          <Title>Insert Delete</Title>
        </Body>
      </Header>
        <View>
          <TextInput
            placeholder="Username"
            value={this.state.userName}
            onChangeText={text => this.updateText(text, 'userName')}
          />
        </View>
        <View>
          <Button size="large" title="Save" onPress={() => this.saveUser()} />
          <Button
            size="large"
            title="List Data DB"
            onPress={() => {
              this.props.navigation.navigate('Users');
            }}
          />
          <Button
            size="large"
            title="HTTP Request"
            onPress={() => {
              this.props.navigation.navigate('HttpPerson');
            }}
          />
        </View>
      </>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default AddUser;
