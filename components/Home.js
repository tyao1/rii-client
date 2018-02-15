import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableNativeFeedback } from 'react-native';
import Navigation from '../services/Navigation';
import Gamepad from '../services/Gamepad';
import Event from '../services/Event';
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       text: Gamepad.address,
       wating: false,
    };
  }

  goToGamepad = () => {

    this.setState({
      waiting: true,
    });
    const off = Event.once('GotId', () => {
      this.setState({
        waiting: false,
      });
      Navigation.push('Gamepad');
    });
    this.timeHandle = setTimeout(() => {
      this.setState({
        waiting: false,
      });
      alert("Connection timeout");
    }, 6000);
    Gamepad.getDevice();
  }

  onTextChange = (text) => {
    this.setState({text});
    Gamepad.address = text; // coupled to Gamepad but no one else change that
  }

  componentWillUnmount() {
    clearTimeout(this.timeHandle);
  }

  render() {
    return <View style={styles.container}>
      <Text style={styles.text}>Enter Server Address:</Text>
      <TextInput
        style={styles.input}
        value={this.state.text}
        onChangeText={this.onTextChange}
      />
      <View style={styles.button}>
        <Button
          style={{
                fontSize: 32,
                }}
           onPress={this.goToGamepad}
           title={this.state.waiting ? "Waiting for device..." : "Connect!"}
           disabled={this.state.waiting}
         />
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
    flex: 1,
    height: '100%',
    padding: 24,
    paddingTop: 64,
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  button: {
    marginTop: 50,
    width: '50%',
  },
  input: {
    fontSize: 28,
    color: '#ccc',
    borderColor: '#fff',
    fontWeight: "700",
    paddingLeft:0,
  }
});

export default Home;
