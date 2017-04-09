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
    Polyline
} from 'react-native-svg';

export default class SearchButton extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <Svg height={this.props.radius * 2} width={this.props.radius * 2}>
                    <Circle cx={this.props.radius} cy={this.props.radius} r={this.props.radius} fill="rgb(220,220,220)" />
                    <Polyline strokeWidth=""
                        points={ 
                            this.props.radius * 0.9 + ',' + this.props.radius * 0.7 + ' ' +
                            this.props.radius * 1.2 + ',' + this.props.radius + ' ' +
                            this.props.radius * 0.9 + ',' + this.props.radius * 1.3
                        }
                        fill="none" stroke='#58c9ce' strokeWidth="3" />
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end'
    }
});

module.exports = SearchButton;