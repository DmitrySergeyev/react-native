import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight,
  Keyboard
} from 'react-native';


import store from 'react-native-simple-store';

export default class TestPage extends Component {

  constructor(props) {
    super(props);

        // this.state = {
        //   data: {
        //     data1: 'myData',
        //     data2: 'myData2'
        //   }
        // }

    fetch('https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=w&apikey=5IXlqKmYCgbFaKN7e0FNFg5hldBGwHQv', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        store.save('wordDefinition', responseJson)
          .then(() => {
            return store.get('wordDefinition');
          });
      })
      .then(() => store.get('wordDefinition'))
      .then((wordDefinition) => {
        this.setState({
          data: {
            data1: wordDefinition,
            data2: 'myData2'
          }
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.contentView}>
          <View style={styles.definitionView}>
            <ScrollView>
              <Text style={styles.textWord}>{JSON.stringify(this.state)}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'red'
  },
  navigationView: {
    flex: 1
  },
  contentView: {
    flex: 5,
    padding: 15,
    justifyContent: 'center'
  },
  definitionView: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textWord: {
    fontWeight: 'bold',
    fontSize: 16
  },
  textDefinition: {
    fontSize: 16
  },
  sentView: {
    flex: 2,
    justifyContent: 'flex-start'
  },
  sentButtonView: {
    height: 60,
    width: 180,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#58c9ce',
    borderWidth: 3,
    borderRadius: 3
  },
  sentButtonText: {
    color: '#58c9ce',
    fontSize: 18
  }
});

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = TestPage;