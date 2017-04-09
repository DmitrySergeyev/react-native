import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  TouchableHighlight,
  Keyboard
} from 'react-native';

import SearchButton from './SearchButton.js';
import store from 'react-native-simple-store';

var HttpStatus = require('http-status-codes');

export default class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = { term: '' }
  }

  render() {
    return (<Navigator renderScene={this.renderScene.bind(this)} />);
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.mainView}>
        <View style={styles.inputView}>
          <Text style={styles.label} selectable={false}>Search</Text>
          <TextInput
            placeholder="Enter the word here..."
            placeholderTextColor='#ffffff'
            autoCapitalize='none'
            style={styles.input}
            underlineColorAndroid='#ffffff'
            value={this.state.term}
            onChangeText={(term) => this.setState({ term })}
            onSubmitEditing={(event) => {
              this.searchWord(event.nativeEvent.text)
            }}
          />
        </View>
        <View style={styles.submitView}>
          <TouchableHighlight onPress={this.searchWord.bind(this)} style={styles.submitButtonView} underlayColor='#58c9ce'>
            <View onPress={this.searchWord.bind(this)}>
              <SearchButton radius="40" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  searchWord() {
    if (!this.state.term) {
      Alert.alert(
        'Ошибка',
        'Не введено слово для поиска!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: true }
      )
    }
    else {
      Keyboard.dismiss();

      fetch('https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=' + this.state.term + '&apikey=5IXlqKmYCgbFaKN7e0FNFg5hldBGwHQv', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status !== HttpStatus.OK) {
            Alert.alert(
              'Ошибка',
              'Запрос не выполнен!',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: true }
            )
          }
          else if (responseJson.count > 0) {
            store.save('lastwordDefinition', responseJson)
              .then(() => {
                store.get('searchHistory')
                  .then((data) => {
                    if (data) {
                      let index = data.indexOf(this.state.term);
                      if (index > -1) {
                        data.splice(index, 1);
                      }
                      data.push(this.state.term);
                      store.save('searchHistory', data)
                        .then(() => {
                          this.props.navigator.push({
                            name: 'DefinitionPage',
                            props: {
                              name: 'DefinitionPage',
                            }
                          });
                        })
                    }
                    else {
                      store.save('searchHistory', [this.state.term])
                        .then(() => {
                          this.props.navigator.push({
                            name: 'DefinitionPage',
                            props: {
                              name: 'DefinitionPage',
                            }
                          });
                        })
                    }
                  })
              });
          }
          else {
            Alert.alert(
              'Инфо',
              'Не найдено!',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: true }
            )
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#58c9ce',
    padding: 15
  },
  inputView: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#58c9ce'
  },
  submitView: {
    flex: 2,
    justifyContent: 'flex-end'
  },
  label: {
    fontSize: 30,
    color: "#ffffff"
  },
  input: {
    marginTop: 10,
    fontSize: 20,
    textDecorationLine: 'none',
    color: "#ffffff"
  },
  submitButtonView: {
    alignSelf: 'flex-end'
  }
});

module.exports = SearchPage;