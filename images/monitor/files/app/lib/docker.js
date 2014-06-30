var Docker = require('dockerode');
var docker = new Docker({ socketPath: '/var/run/docker.sock' });
var Promise = require('rsvp').Promise;

function safeContainer (container) {
  return {
    id: container.Id,
    name: (container.Name || container.Names[0]).replace('/', ''),
    status: container.Status,
    tag: container.Image.split(':').pop()
  }
}

function listContainers (match) {
  return new Promise(function (resolve, reject) {
    docker.listContainers({ all: 1 }, function (error, containers) {
      if (error) {
        return reject(error);
      }

      match = new RegExp(match || '.', 'i');

      resolve(containers.map(safeContainer).filter(function (container) {
        return match.test(container.name);
      }));
    });
  });
}

function showContainer (id) {
  return new Promise(function (resolve, reject) {
    docker.getContainer(id).inspect(function (error, container) {
      if (error) {
        return reject(error);
      }

      resolve(safeContainer(container));
    });
  });
}

module.exports = {
  listContainers: listContainers,
  showContainer: showContainer
};
