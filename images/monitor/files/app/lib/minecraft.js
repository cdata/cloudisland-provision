'use strict';

var docker = require('./docker');
var fs = require('fs');
var path = require('path');
var Promise = require('rsvp').Promise;
var containerVolumePath = '/usr/share/container-volumes';

var getModsForContainer = (function () {
  var cache = {};

  return function (name) {
    if (cache[name]) {
      return cache[name];
    }

    return cache[name] = new Promise(function (resolve, reject) {
      fs.readFile(path.join(containerVolumePath, name, 'mod-manifest.json'), function (error, data) {
        if (error) {
          return resolve([]);
        }

        resolve(JSON.parse(data.toString('utf8')));
      });
    });
  };
})();

var minecraft = {
  containers: {
    index: function *() {
      let containers = yield docker.listContainers('minecraft');
      let mods = yield Promise.all(containers.map(function (container) {
        return getModsForContainer(container.name);
      }));

      containers.forEach(function (container, index) {
        container.mods = mods[index];
      });

      this.is('application/json');
      this.body = containers;
    },
    show: function *(id) {
      let container = yield docker.showContainer(id);
      let mods = yield getModsForContainer(container.name);

      container.mods = mods;

      this.is('application/json');
      this.body = container;
    },
    mods: function *(id) {
      let container = yield docker.showContainer(id);

      this.is('application/x-tar');
      this.body = fs.createReadStream(path.join(containerVolumePath, container.name, 'mods.tar'));
    }
  }
};

module.exports = minecraft;
