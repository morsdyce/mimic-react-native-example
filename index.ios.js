/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import connect from 'mimic/react-native';
import superagent from 'superagent';

connect();

export default class mimicReactNative extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: 'Press on the buttons above to send a request'
    };

    this.fetchRequest = this.fetchRequest.bind(this);
    this.xhrRequest = this.xhrRequest.bind(this);
  }

  fetchRequest() {
    superagent.get('https://jsonplaceholder.typicode.com/posts/3')
      .end((err, resp) => {
        if (err) {
          console.log('*** error', err);
        }

        this.setState({
          text: `Fetch response: ${JSON.stringify(resp.body, null, 2)}`
        });
      })
  }

  xhrRequest() {
    fetch('https://jsonplaceholder.typicode.com/posts/3', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      return response.json();
    })
    .then((response) => {
      this.setState({
        text: `XHR request response: ${JSON.stringify(response, null, 2)}`
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="XHR Request"
          style={styles.container}
          onPress={ this.xhrRequest }/>
        <Button
          title="Fetch Request"
          style={styles.container}
          onPress={ this.fetchRequest }/>
        <Text style={styles.instructions}>
          { this.state.text }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#F5FCFF',
    color: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('mimicReactNative', () => mimicReactNative);
