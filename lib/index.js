"use strict";
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./youtube"));
__export(require("./sync"));
__export(require("./common-client"));
__export(require("./client"));
__export(require("./youtube-client"));
exports.channelMap = {
  publishedat: 'publishedAt',
  customurl: 'customUrl',
  localizedtitle: 'localizedTitle',
  localizeddescription: 'localizedDescription',
  mediumthumbnail: 'mediumThumbnail',
  highthumbnail: 'highThumbnail',
  lastupload: 'lastUpload',
  itemcount: 'itemCount',
  playlistcount: 'playlistCount',
  playlistitemcount: 'playlistItemCount',
  playlistvideocount: 'playlistVideoCount',
  playlistvideoitemcount: 'playlistVideoItemCount',
};
exports.playlistMap = {
  publishedat: 'publishedAt',
  channelid: 'channelId',
  channeltitle: 'channelTitle',
  localizedtitle: 'localizedTitle',
  localizeddescription: 'localizedDescription',
  mediumthumbnail: 'mediumThumbnail',
  highthumbnail: 'highThumbnail',
  standardthumbnail: 'standardThumbnail',
  maxresthumbnail: 'maxresThumbnail',
};
exports.videoMap = {
  publishedat: 'publishedAt',
  categoryid: 'categoryId',
  channelid: 'channelId',
  channeltitle: 'channelTitle',
  localizedtitle: 'localizedTitle',
  localizeddescription: 'localizedDescription',
  mediumthumbnail: 'mediumThumbnail',
  highthumbnail: 'highThumbnail',
  standardthumbnail: 'standardThumbnail',
  maxresthumbnail: 'maxresThumbnail',
  defaultaudiolanguage: 'defaultAudioLanguage',
  defaultlanguage: 'defaultLanguage',
  licensedcontent: 'licensedContent',
  livebroadcastcontent: 'liveBroadcastContent',
  blockedregions: 'blockedRegions',
  allowedregions: 'allowedRegions'
};
exports.playlistFields = ['id', 'channelId', 'channelTitle', 'description',
  'highThumbnail', 'localizedDescription', 'localizedTitle',
  'maxresThumbnail', 'mediumThumbnail', 'publishedAt', 'standardThumbnail',
  'thumbnail', 'title', 'count', 'itemCount'];
exports.channelFields = ['id', 'count', 'country', 'lastUpload', 'customUrl', 'description',
  'favorites', 'highThumbnail', 'itemCount', 'likes', 'localizedDescription', 'localizedTitle',
  'mediumThumbnail', 'publishedat', 'thumbnail', 'title', 'uploads',
  'count', 'itemCount', 'playlistCount', 'playlistItemCount', 'playlistVideoCount', 'playlistVideoItemCount'
];
exports.videoFields = [
  'id', 'caption', 'categoryId', 'channelId', 'channelTitle', 'defaultAudioLanguage',
  'defaultLanguage', 'definition', 'description', 'dimension', 'duration', 'highThumbnail',
  'licensedContent', 'liveBroadcastContent', 'localizedDescription', 'localizedTitle', 'maxresThumbnail',
  'mediumThumbnail', 'projection', 'publishedAt', 'standardThumbnail', 'tags', 'thumbnail', 'title', 'blockedRegions', 'allowedRegions'
];
function isEmpty(s) {
  return !(s && s.length > 0);
}
exports.isEmpty = isEmpty;
function getFields(fields, all) {
  if (!fields || fields.length === 0) {
    return undefined;
  }
  var existFields = [];
  if (all) {
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
      var s = fields_1[_i];
      if (all.includes(s)) {
        existFields.push(s);
      }
    }
    if (existFields.length === 0) {
      return undefined;
    }
    else {
      return existFields;
    }
  }
  else {
    return fields;
  }
}
exports.getFields = getFields;
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
function map(obj, m) {
  if (!m) {
    return obj;
  }
  var mkeys = Object.keys(m);
  if (mkeys.length === 0) {
    return obj;
  }
  var obj2 = {};
  var keys = Object.keys(obj);
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    var k0 = m[key];
    if (!k0) {
      k0 = key;
    }
    obj2[k0] = obj[key];
  }
  return obj2;
}
exports.map = map;
function mapArray(results, m) {
  if (!m) {
    return results;
  }
  var mkeys = Object.keys(m);
  if (mkeys.length === 0) {
    return results;
  }
  var objs = [];
  var length = results.length;
  for (var i = 0; i < length; i++) {
    var obj = results[i];
    var obj2 = {};
    var keys = Object.keys(obj);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
      var key = keys_2[_i];
      var k0 = m[key];
      if (!k0) {
        k0 = key;
      }
      obj2[k0] = obj[key];
    }
    objs.push(obj2);
  }
  return objs;
}
exports.mapArray = mapArray;
function buildShownItems(keyword, all, includeDescription) {
  if (!all) {
    return [];
  }
  if (!keyword || keyword === '') {
    return all;
  }
  var w = keyword.toLowerCase();
  if (includeDescription) {
    return all.filter(function (i) { return (i.title && i.title.toLowerCase().includes(w)) || (i.description && i.description.toLocaleLowerCase().includes(w)); });
  }
  else {
    return all.filter(function (i) { return i.title && i.title.toLowerCase().includes(w); });
  }
}
exports.buildShownItems = buildShownItems;
