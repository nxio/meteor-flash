var FLASH_DEFAULT_ID   = '__default__';
var FLASH_DEFAULT_TYPE = 'warning';


var flashDeps = new Deps.Dependency();

Flash = {
  config: {
    timeout: null,
    defaultType: FLASH_DEFAULT_TYPE
  },
  messages: {},
  profiles: {
    basic: {
      tag: 'div',
      closeButton: null,
      classes: ['flash-message'],
      statePrefix: '',
      attributes: {}
    },
    foundation: {
      tag: 'div',
      closeButton: '<a href="#" class="close">&times;</a>',
      classes: ['alert-box'],
      statePrefix: '',
      attributes: { 'data-alert': '' }
    },
    bootstrap: {
      tag: 'div',
      closeButton: '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>',
      classes: ['alert'],
      statePrefix: 'alert-',
      attributes: {}
    }
  }
};

Flash.switchProfile = function (profileName) {
  Flash.config.profile = Flash.profiles[profileName];
};

var flashSet = function (id, message, localTimeout, persist) {
  var timeout = localTimeout || Flash.config.timeout,
      timer;

  Flash.messages[id] = {
    level: message[0],
    message: message[1],
    timestamp: Date.now(),
    persist: !!persist
  };
  flashDeps.changed();

  if (timeout) {
    timer = setTimeout(function () {
      Flash.clear(id);
      clearTimeout(timer);
    }, timeout);
  }
};

var flashStateFn = function (state) {
  return function (id, message, localTimeout, persist) {
    if (!message) {
      message = id;
      id = FLASH_DEFAULT_ID;
    }
    return flashSet(id, [state, message], localTimeout, persist);
  };
};

// Try to detect which profile to load
function autoDetectProfile() {
  // Foundation
  if (typeof(Foundation) !== 'undefined' && Foundation.name === 'Foundation') {
    return 'foundation';
  }

  // Bootstrap
  if (typeof($) !== 'undefined' && $.fn && typeof($.fn.modal) !== 'undefined') {
    return 'bootstrap';
  }

  // Basic
  return 'basic';
}

// If IronRouter is present, -
// Clear Flash messages on page-change
function injectRouter() {
  if (typeof(Router) !== 'undefined' && Router.routes) {
    Router.onBeforeAction(function () { Flash.clear(); this.next(); });
  }
}

Meteor.startup(function () {
  Flash.switchProfile(autoDetectProfile());
  injectRouter();
});

// Allow custom states
Flash.registerStateFn = function (fnName, state) {
  if (typeof(state) === 'undefined')
    state = fnName;

  if (typeof(Flash[fnName]) === 'undefined')
    Flash[fnName] = flashStateFn(state);
  else
    console.error("Flash." + fnName + " cannot be registered, because it already exists.")
};

Flash.registerStateFn('set', Flash.config.defaultType);
Flash.registerStateFn('warning');
Flash.registerStateFn('success');
Flash.registerStateFn('info');
Flash.registerStateFn('danger');

Flash.get = function (id) {
  flashDeps.depend();
  id = id || FLASH_DEFAULT_ID;
  return Flash.messages[id];
};

Flash.clear = function (id) {
  var messages = Flash.messages,
      key;

  if (!id) {
    for (key in messages) {
      if (messages.hasOwnProperty(key) && messages[key]) {
        if(messages[key].persist)
          messages[key].persist = false;
        else
          messages[key] = null;
      }
    }
  } else {
    if (messages[id].persist)
      messages[id].persist = false;
    else
      messages[id] = null;
  }
  flashDeps.changed();
};
