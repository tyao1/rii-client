import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './services/Navigation';
import Event from './services/Event';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Component: Navigation.getComponent(),
      params: Navigation.getParams(),
    }
    Event.on('Navigation', this.updateView.bind(this));
  }
  updateView() {
    this.setState({
      Component: Navigation.getComponent(),
      params: Navigation.getParams(),
    });
  }
  render() {
    const {Component, params} = this.state;
    return (
      <View style={{flex: 1}}>
        <Component {...params}>
        </Component>
      </View>
    );
  }
}
