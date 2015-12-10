/**
 * Instagram model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Instagram = require('./instagram.model');
var InstagramEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InstagramEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Instagram.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    InstagramEvents.emit(event + ':' + doc._id, doc);
    InstagramEvents.emit(event, doc);
  }
}

module.exports = InstagramEvents;
