/** @jsx React.DOM */

var ajax = function (method) {
  return function (url) {
    return function (payload) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.onload = function () {
          xhr.onload = null;
          xhr.onerror = null;

          if (xhr.status >= 200 && xhr.status < 400) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        };

        xhr.onerror = function () {
          xhr.onload = null;
          xhr.onerror = null;

          reject('Unknown network error.');
        };

        if (method === 'get') {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(payload || {}));
        }
      });
    };
  };
};

var minecraft = {
  containers: {
    index: ajax('GET')('/api/minecraft_containers'),
    show: function (id) {
      return ajax('GET')('/api/minecraft_containers/' + id);
    }
  }
};

(function update () {
  minecraft.containers.index().then(function (containers) {
    React.renderComponent(<Status containers={ containers }></Status>, document.body);
  });

  window.setTimeout(update, 5000);
})();
