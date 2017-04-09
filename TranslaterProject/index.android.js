import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import SearchPage from './components/SearchPage/SearchPage.js';
import HistoryPage from './components/HistoryPage/HistoryPage.js';
import DefinitionPage from './components/DefinitionPage/DefinitionPage.js';

import TestPage from './components/TestPage/TestPage.js';

export default class TranslaterProject extends Component {
  render() {
    return (


   //   <TestPage/>



      <Navigator initialRoute={{
        //component: SearchPage 
        name: 'HistoryPage'
      }}
        renderScene={this.renderScene}





        /*renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator, ...route.props });

          }
          return undefined;
        }}*/





         configureScene={(route) => {
           if (route.sceneConfig) {
             return route.sceneConfig;
           }
           return Navigator.SceneConfigs.FloatFromRight;
         }}
       />
    );
  }
  renderScene(route, navigator) {
    if (route.name == 'SearchPage') {
      return (
        <SearchPage
          navigator={navigator}
          {...route.props}
        />
      )
    }
    if (route.name == 'HistoryPage') {
      return (
        <HistoryPage
          navigator={navigator}
          {...route.props}
        />
      )
    }
    if (route.name == 'DefinitionPage') {
      return (
        <DefinitionPage
          navigator={navigator}
          {...route.props}
        />
      )
    }
  }
}

AppRegistry.registerComponent('TranslaterProject', () => TranslaterProject);
