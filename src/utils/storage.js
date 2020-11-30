Storage.prototype.$set = function(key, item) {
  this[key] = JSON.stringify(item);
}

Storage.prototype.$get = function(key) {
  return JSON.parse(this[key]);
}