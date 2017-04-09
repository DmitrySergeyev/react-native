import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Navigator,
    TouchableHighlight,
    Keyboard
} from 'react-native';

import Svg, {
    Circle,
    Line,
    Rect,
} from 'react-native-svg';

export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{this.props.displayedPageName}</Text>
                </View>
                <View style={styles.navigationView}>
                    <TouchableHighlight onPress={() => this.navigationGoTo('SearchPage')} style={styles.navigationItem} underlayColor='#58c9ce'>
                        <View >
                            <Svg height="40" width="40">
                                <Line x1="16" y1="16" x2="33" y2="33" stroke='#ffffff' strokeWidth="3" />
                                <Circle cx="16" cy="16" r="10" fill='#58c9ce' stroke='#ffffff' strokeWidth="3" />
                            </Svg>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.navigationGoTo('HistoryPage')} style={styles.navigationItem} underlayColor='#58c9ce'>
                        <View>
                            <Svg height="40" width="40">
                                <Rect x="5" y="5" width="22" height="30" fill='#58c9ce' stroke='#ffffff' strokeWidth="3" strokeLinecap='butt' />
                                <Line x1="10" y1="12" x2="22" y2="12" stroke='#ffffff' strokeWidth="3" />
                                <Line x1="10" y1="20" x2="22" y2="20" stroke='#ffffff' strokeWidth="3" />
                                <Line x1="10" y1="28" x2="22" y2="28" stroke='#ffffff' strokeWidth="3" />
                            </Svg>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.navigationGoTo('DefinitionPage')} style={styles.navigationItem} underlayColor='#58c9ce'>
                        <View >
                            <Svg height="40" width="40">
                                <Circle cx="20" cy="20" r="12" fill='#58c9ce' stroke='#ffffff' strokeWidth="3" />
                                <Circle cx="20" cy="20" r="5" fill='#ffffff' />
                            </Svg>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    navigationGoTo(pageComponent) {
        if (this.props.parent.props.name !== pageComponent) {
            this.props.navigator.push({
                name: pageComponent,
                props: {
                    name: pageComponent
                }
            });
        }
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,        
        minHeight: 80
    },
    nameView: {
        flex: 1,
        backgroundColor: '#58c9ce',
        justifyContent: 'center'
    },
    nameText: {
        fontSize: 22,
        color: "#ffffff",
        textAlign: 'left',
        padding: 10
    },
    navigationView: {
        flex: 1,
        backgroundColor: '#58c9ce',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    navigationItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = NavigationBar;