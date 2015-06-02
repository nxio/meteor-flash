# Flash

### Flexible Flash messages for Meteor

Smart package to display easily simple flash message in your Meteor app.

The package has been created initially by [@MixinLabs](https://github.com/MixinLabs) and the original version is available at [https://github.com/MixinLabs/meteor-flash](https://github.com/MixinLabs/meteor-flash). Compared to the original package, this version features:

- compatibility with Meteor 1.0
- timestamps for management of repeated messages, contributed by [@yourcelf](https://github.com/yourcelf).


#### Features

- Automatically detects CSS Framework (Bootstrap, Foundation) and styles flash messages accordingly
- If [IronRouter](https://github.com/EventedMind/iron-router) is present, flash messages will be cleared on page-change (otherwise, you will need to implement this logic yourself)
	- You can make a message persist **one** route (for example, submitting a form that, on success, redirects to the overview page) by setting the fourth parameter `persist` to `true`
- Multiple profile support. Comes with three profiles out-of-the-box
	- **bootstrap** - Styling for Bootstrap CSS Framework
	- **foundation** - Styling Zurb Foundation
	- **basic** - Unstyled flash-messages for easy customisation
	- *Create your own*
- Delayed flash message clearing (disabled by default)

#### Install
`meteor add naxio:flash`


#### Set flash message

`Flash.set([id], message, [timeout], [persist])` - Same as calling `Flash.warning(id, message, [timeout], [persist])`.

**Parameters:**

* `id` *(optional, defaults to `__default__`)*  - assigns an id to a message. Helpful for multiple flash messages on the same page.
* `message` - Flash message
* `timeout` - *In miliseconds*, clears this flash message after a specified amount of time. [Read more..](#clearing)
* `persist` - When set to `true` (and using [IronRouter](https://github.com/EventedMind/iron-router)), make this message persist **one** route (for example, submitting a form that, on success, redirects to the overview page). Otherwise the message is cleared on route change.

**Function variants according to flash message state:** 

* `Flash.warning([id], message, [timeout])`
* `Flash.success([id], message, [timeout])`
* `Flash.info([id], message, [timeout])`
* `Flash.danger([id], message, [timeout])`

*Custom* variants can be registered using `Flash.registerStateFn("name of the state")` for when your CSS framework has different flash message state classes.

#### Template helpers

Simply use `{{flash id}}` helper to display flash message. **id** parameter is optional, defaults to `__default__`.

<a name="clearing" id="clearing"></a>
#### Clearing flash messages


`Flash.clear()` - clear all flash messages.

`Flash.clear(id)` - clear flash message with specific id.

Alternatively, it is possible for a message to clear out itself after a certain period of time. By default, this is disabled. To enable this globally, specify time (in milliseconds), e.g.: `Flash.config.timeout = 5000`. The message will be cleared after 5 seconds. You can also set the timeout for each flash message overriding this global config, e.g.: `Flash.set('top','Test message', 3000)`.

#### Switching profile

Switching profile allows to choose the presentation of flash messages.

It comes with three profiles: Bootstrap, Foundation and Basic.

It tries to detect if either Bootstrap or Foundation are present in the webapp and switches the profile for you.

Alternatively, you can create your own profile, e.g.:

    Flash.profiles.myprofile = {
      tag: 'div',
      closeButton: '<a href="#" class="close">&times</a>',
      classes: ['myflash', 'panel'],
      statePrefix: 'myflash-',
      attributes: { "data-myflash": ''}
    };

To switch profile manually, call `Flash.switchProfile(profile_name)`.

**tag** - flash message element HTML tag.

**closeButton** - if `null`, close-button will not be inserted. Otherwise, provide html code for your button.

**classes** - list of css classes.

**statePrefix** - prepends specified text to a class that identifies the state of a flash message. For example, when calling `Flash.success` it will generate a CSS class like so `statePrefix + "success"`

**attributes** - a map of element HTML attributes.
