import dgram from 'react-native-udp';
import Event from './Event';
/*
  struct gamepad_report { // 12 bytes
      int16_t x;
      int16_t y;
      int16_t rx;
      int16_t ry;
      uint8_t z;
      uint8_t rz;
      uint16_t buttons;
  };
  struct packet { // 13 bytes total?
    gamepad_report report;
    uint8_t idx;

  };
*/
class GamepadService {
  constructor() {
    this.buffer = buffer = new ArrayBuffer(13*8);
    this.xys = new Int16Array(buffer, 0, 4);
    this.zs = new Uint8Array(buffer, 8, 2);
    this.buttons = new Uint16Array(buffer, 10, 1);
    this.id = new Uint8Array(buffer, 12, 1);
    this.socket = dgram.createSocket('udp4');
    this.address = '10.0.0.111';
    this.sendBuffer = new Uint8Array(this.buffer);
    this.socket.on('message', this.onMessage);

    this._lastAddress;
  }

  setAddress = (addr) => {
    this.address = addr;
  }

  onMessage = (msg, rinfo) => {
    console.log(msg);
    //console.log(new Int16Array(msg));
    this.id[0] = msg[0];
    this._lastAddress = this.address;
    Event.emit('GotId');
  }

  getDevice = () => {
    if (this.id[0]!== 255 && this._lastAddress == this.address) {
      Event.emit('GotId');
    } else {
      this.id[0] = 255; // no device
      this.send();
    }
  }

  send = () =>  {
    // console.log('send', this.address);
    this.socket.send(this.sendBuffer, 0, this.sendBuffer.length, 6666, this.address, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }


  down(id) {
    console.log('down:' + id);
    this.buttons[0] |= (1 << id);
    this.send();
  }

  up(id) {
    console.log('up:' + id);
    this.buttons[0] &= ~(1 << id);
    this.send();
  }

  setLeft(x, y) {
    this.xys[0] = x;
    this.xys[1] = y;
    this.send();
  }

  setRight(x, y) {
    this.xys[2] = x;
    this.xys[3] = y;
    this.send();
  }

  setZ(z0, z1) {
    this.zs[0] = z0;
    this.zs[1] = z1;
    this.send();
  }

}

export default new GamepadService();
