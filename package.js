Package.describe({
  name: "naxio:flash",
  summary: "Simple Flash messages for Meteor, compatible with Iron-Router, Bootstrap, and Foundation.",
  version: "0.2.3",
  git: "https://github.com/nxio/meteor-flash"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.0');
  api.use(['deps', 'spacebars', 'ui'], 'client');
  api.add_files(['flash.js', 'hbs_helper.js'], 'client');
  api.export('Flash', 'client');
});

