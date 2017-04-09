import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import Svg, {
    Line,
    Circle,
    Polyline,
    Polygon
} from 'react-native-svg';

export default class NotHistoryLabel extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View>
                <Svg height={this.props.radius * 3} width={this.props.radius * 3}>
                    <Circle cx={this.props.radius * 1.5} cy={this.props.radius * 1.5} r={this.props.radius} fill='#DDDDDD' />
                    <Polygon fill="white"
                        points={
                            this.props.radius * 1.5 + ',' + this.props.radius * 1.5 + ' ' +
                            this.props.radius * 1.5 + ',' + 0 + ' ' +
                            this.props.radius * 3 + ',' + 0
                        }
                    />
                    <Circle cx={this.props.radius * 1.5} cy={this.props.radius * 1.5} r={this.props.radius - 4} fill='#EEEEEE' />
                    <Polyline fill="none" stroke='#DDDDDD' strokeWidth="4"
                        points={
                            this.props.radius * 1.4 + ',' + this.props.radius * 1.6 * 0.75 + ' ' +
                            this.props.radius * 1.4 + ',' + this.props.radius * 1.6 + ' ' +
                            this.props.radius * 1.4 * 1.25 + ',' + this.props.radius * 1.6
                        } />

                    <Polyline fill="none" stroke='#DDDDDD' strokeWidth="4"
                        points={
                            (this.props.radius * 2.207 - 2.828) + ',' + (this.props.radius * 1.293 + 2.828) + ' ' +
                            (this.props.radius * 2.207 - 2.828) + ',' + (this.props.radius * 0.793 + 2.828) + ' ' +
                            (this.props.radius * 2.7 - 2.828) + ',' + (this.props.radius * 0.793 + 2.828)
                        } />
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

module.exports = NotHistoryLabel;