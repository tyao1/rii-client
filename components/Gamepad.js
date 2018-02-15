import React from 'react';
import Navigation from '../services/Navigation';

import { PanResponder, Dimensions, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
} from 'react-native-svg';
const { width, height } = Dimensions.get("window");

import GameService from '../services/Gamepad';
import Touchable from './Touchable';

class Gamepad extends React.Component {


  componentWillMount() {

 }

  componentDidMount() {
    // this.senderHandle = setInterval(GameService.send, 32);
  }

  componentWillUnmount() {
    // clearInterval(this.sendHandle);
  }

  createDown = (idx) => {
    return () => GameService.down(idx);
  }
  createUp = (idx) => {
    return () => GameService.up(idx);
  }

  render() {
    return <View
      style={styles.container}
      /*
      onStartShouldSetResponderCapture={(evt) => {
       console.log(evt.nativeEvent);
       return true;
      }}
      onMoveShouldSetResponderCapture={(evt) => {
       console.log(evt);
       return true;
      }}
      */

      >

        <View style={styles.button}
          onResponderTerminationRequest={()=>true}
          onStartShouldSetResponder={()=>true}
          onMoveShouldSetResponder={()=>true}
          onResponderReject={()=>{
            console.log('reject 1');
          }}
          onResponderGrant={(evt) => {
            console.log('grant 1');
            console.log(evt.nativeEvent.target);
          }}
        >


        </View>

        <View style={styles.button}
          onResponderTerminationRequest={()=>true}
          onStartShouldSetResponder={()=>true}
          onMoveShouldSetResponder={()=>true}
          onResponderReject={()=>{
            console.log('reject 2');
          }}
          onResponderGrant={(evt) => {
            console.log('grant 2');
            console.log(evt.nativeEvent.target);
          }}

        >


        </View>
      </View>
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: '#eee',
    fontWeight: 'bold',
    width: "90%",
  },
  container: {
    //flex: 1,
    //backgroundColor: '#000',
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
  },
  input: {
    fontSize: 28,
    color: '#ccc',
    borderColor: '#fff',
    fontWeight: "700",
  }
});
export default Gamepad;
