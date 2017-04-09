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
  Keyboard,
  ActivityIndicator,
  ListView
} from 'react-native';

import NavigationBar from '../NavigationBar/NavigationBar.js';
import store from 'react-native-simple-store';

export default class DefinitionPage extends Component {

  componentWillMount() {
    store.get('lastwordDefinition')
      .then((data) => {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          dataSource: ds.cloneWithRows(data.results),
          isLoading: false
        });

      })
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.mainView}>
          <View style={styles.navigationView}>
            <NavigationBar navigator={this.props.navigator} parent={this} displayedPageName="Определение" />
          </View>
          <View style={styles.contentView}>
            <ActivityIndicator size="large" color="#58c9ce" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.mainView}>
          <View style={styles.navigationView}>
            <NavigationBar navigator={this.props.navigator} parent={this} displayedPageName="Definition" />
          </View>
          <View style={styles.contentView}>
            <View style={styles.definitionView}>
              <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} >
              </ListView>
            </View>
            
            {/*
                  Don't remove!!!

            <View style={styles.sentView}>
              <TouchableHighlight onPress={() => this.sendWord()} style={styles.sentButtonView} underlayColor='#ffffff' >
                <View>
                  <Text style={styles.sentButtonText}>Отправить слово</Text>
                </View>
              </TouchableHighlight>
            </View>*/}
          </View>
        </View>
      )
    };
  }

  navigationGoTo(pageComponent) {
    this.props.navigator.push({
      component: pageComponent
    });
  }

  renderRow = (data) => {
    return (
      <View>
        <Text style={styles.textWord}> {data.headword.capitalize()} -</Text>
        <Text style={styles.textDefinition}> {data.senses[0].definition[0]} </Text>
      </View>
    );
  }

  sendWord() {
    fetch('http://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word: this.props.info.results[0].headword
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(
          'Info',
          'Response: ' + JSON.stringify(responseJson.json),
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: true }
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  loadingText: {
    color: '#58c9ce',
    paddingTop: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  rowContainer: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 12,
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
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

module.exports = DefinitionPage;