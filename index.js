module.exports = subscribe

module.exports.init = init;
module.exports.toDestory = toDestory;

function init (self) {
  self.__destroyers = null
}

function subscribe (self, source, eventName, cb, once) {
  var destroyer = function () {
    source.removeListener(eventName, cb)
  }
  toDestory(self, destroyer)
  source[once ? 'once' : 'on'](eventName, cb)
  return destroyer
}

function toDestory (self, item) {
  if (!self.hasOwnProperty('_destroyers')) {
    console.warn('`toDestory` now breaking inline cache')
    console.warn('you should call `initSubscribe` in your Constructor before using `toDestory`')
  }
  if (!self.__destroyers) {
    self.__destroyers = []
  }
  self.__destroyers.push(item)
}
