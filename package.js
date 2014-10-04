Package.describe({
  summary: "Simple but flexible Flash messages for Meteor, compatible with Iron-Router, Bootstrap, Foundation or custom styling.",
  version: "0.2.1",
  git: "https://github.com/nxio/meteor-flash"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.use(['deps', 'spacebars', 'ui'], 'client');
  api.add_files(['flash.js', 'hbs_helper.js'], 'client');
  api.export('Flash', 'client');
});

