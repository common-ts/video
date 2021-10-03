"use strict";
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./metadata"));
__export(require("./youtube"));
__export(require("./sync"));
function getLimit(limit, d) {
  if (limit) {
    return limit;
  }
  if (d && d > 0) {
    return d;
  }
  return 48;
}
exports.getLimit = getLimit;
var CategoryClient = (function () {
  function CategoryClient(key, httpRequest) {
    this.key = key;
    this.httpRequest = httpRequest;
    this.getCagetories = this.getCagetories.bind(this);
  }
  CategoryClient.prototype.getCagetories = function (regionCode) {
    if (!regionCode) {
      regionCode = 'US';
    }
    var url = "https://www.googleapis.com/youtube/v3/videoCategories?key=" + this.key + "&regionCode=" + regionCode;
    return this.httpRequest.get(url).then(function (res) { return fromYoutubeCategories(res); });
  };
  return CategoryClient;
}());
exports.CategoryClient = CategoryClient;
function fromYoutubeCategories(res) {
  if (!res || !res.items || res.items.length === 0) {
    return [];
  }
  return res.items.filter(function (i) { return i.snippet; }).map(function (item) {
    var snippet = item.snippet;
    var i = {
      id: item.id,
      title: snippet.title,
      assignable: snippet.assignable,
      channelId: snippet.channelId
    };
    return i;
  });
}
exports.fromYoutubeCategories = fromYoutubeCategories;
