import {BackHandler} from 'react-native';
import Event from './Event';
/*
  A single instance of Navigation class to manage navigations
*/


class Navigation {

  constructor() {
    this.mapping = {};
    this.stack = [];
    this.paramsStack = [];

    BackHandler.addEventListener('hardwareBackPress', () => {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.
      if (this.stack.length > 1) {
        this.back();
        return true;
      }
      return false;
    });
  }

  register(key, component) {
    this.mapping[key] = component;
  }

  push(key, param) {
    if (!key in this.mapping) return;
    this.stack.push(this.mapping[key]);
    this.paramsStack.push(param);
    Event.emit('Navigation');
  }

  back() {
    this.stack.pop();
    this.paramsStack.pop();
    Event.emit('Navigation');
  }

  getComponent() {
    let id = this.stack.length - 1;
    if (id == -1) return null;
    return this.stack[id];
  }

  getParams() {
    let id = this.stack.length - 1;
    if (id == -1) return null;
    return this.paramsStack[id];
  }

}


export default new Navigation();
