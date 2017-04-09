import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    ListView
} from 'react-native';

import store from 'react-native-simple-store';

import NotHistoryLabel from './NotHistoryLabel.js';
import NavigationBar from '../NavigationBar/NavigationBar.js';

export default class HistoryPage extends Component {

    componentWillMount() {
        store.get('searchHistory')
            .then((data) => {
                if (data) {
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({
                        dataSource: ds.cloneWithRows(data),
                        isLoading: false,
                        historyExist: true
                    });
                }
                else {
                    this.setState({
                        isLoading: false,
                        historyExist: false
                    });
                }

            })
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }


    render() {
        // return (<Navigator renderScene={this.renderScene.bind(this)} />);
        if (this.state.isLoading) {
            return (
                <View style={styles.mainView}>
                    <View style={styles.navigationView}>
                        <NavigationBar navigator={this.props.navigator} parent={this} displayedPageName="History" />
                    </View>
                    <View style={styles.contentView}>
                        <ActivityIndicator size="large" color="#58c9ce" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            )
        }
        else {
            if (this.state.historyExist) {
                return (
                    <View style={styles.mainView}>
                        <View style={styles.navigationView}>
                            <NavigationBar navigator={this.props.navigator} parent={this} displayedPageName="History" />
                        </View>
                        <View style={styles.contentView}>
                            <ListView
                                style={styles.container}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow}
                                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} >
                            </ListView>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.mainView}>
                        <View style={styles.navigationView}>
                            <NavigationBar navigator={this.props.navigator} parent={this} displayedPageName="History" />
                        </View>
                        <View style={styles.contentView}>
                            <NotHistoryLabel radius="40" />
                            <Text style={styles.labelText}>Search history is empty</Text>
                        </View>
                    </View>
                );
            }
        }
    }

    renderScene(route, navigator) {
        return (
            <View style={styles.mainView}>
                <View style={styles.navigationView}>
                    <NavigationBar navigator={this.props.navigator} parent={this} displayedPageName="History" />
                </View>
                <View style={styles.сontentView}>
                    <NotHistoryLabel radius="40" />
                </View>
            </View>
        );
    }

    navigationGoTo(pageComponent) {
        this.props.navigator.push({
            component: pageComponent
        });

    }

    renderRow = (data) => {
        return (
            <View>
                <Text style={styles.textWord}>{data}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    navigationView: {
        flex: 1
    },
    contentView: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    loadingText: {
        color: '#58c9ce',
        paddingTop: 10,
        fontSize: 18,
        textAlign: 'center'
    },
    labelText: {
        color: '#58c9ce',
        paddingTop: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    textWord: {
        fontWeight: 'bold',
        fontSize: 16
    },
    rowContainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

module.exports = HistoryPage;