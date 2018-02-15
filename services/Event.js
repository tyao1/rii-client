class EventEmitter {

  constructor() {
    this.listeners = Object.create(null);
  }

  checkFn(fn) {
    if (typeof fn != 'function') {
      console.log('Should be a function');
    }
  }

  on(name, fn) {
    this.checkFn(fn);
    if (!this.listeners[name]) this.listeners[name] = [];
    this.listeners[name].push(fn);
    /*
    return {
      release: () => {
        var idx = this.listeners[name].indexOf(fn);
        if (idx > -1) this.listeners[name].splice(idx, 1);
      }
    }
    */
  }

  once(eventType, fn) {
    var ee = this;
    function wrapped() {
      ee.off(eventType, wrapped);
      fn.apply(this, arguments);
    }
    this.on(eventType, wrapped);
    return () => {
      this.off(eventType, wrapped);
    }
  }

  off(name, fn) {
    var idx = this.listeners[name].indexOf(fn);
    if (idx > -1) this.listeners[name].splice(idx, 1);
  }

  emit(name, ...args) {
    if (!this.listeners[name]) return;
    const cur = this.listeners[name].slice();
    for (var i = 0; i < cur.length; i++) {
      var fn = cur[i];
      fn.apply(null, args);
    }
  }
}

export default new EventEmitter();
