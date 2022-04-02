"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
  var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var sync_1 = require("./sync");
var youtube_1 = require("./youtube");
__export(require("./youtube"));
__export(require("./sync"));
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
var VideoClient = (function () {
  function VideoClient(url, httpRequest, maxChannel, maxPlaylist, key) {
    if (maxChannel === void 0) { maxChannel = 40; }
    if (maxPlaylist === void 0) { maxPlaylist = 200; }
    this.url = url;
    this.httpRequest = httpRequest;
    this.maxChannel = maxChannel;
    this.maxPlaylist = maxPlaylist;
    this.key = key;
    this.channelCache = {};
    this.playlistCache = {};
    this.getCagetories = this.getCagetories.bind(this);
    this.getChannels = this.getChannels.bind(this);
    this.getChannel = this.getChannel.bind(this);
    this.getChannelPlaylists = this.getChannelPlaylists.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getPlaylistVideos = this.getPlaylistVideos.bind(this);
    this.getChannelVideos = this.getChannelVideos.bind(this);
    this.getPopularVideos = this.getPopularVideos.bind(this);
    this.getPopularVideosByRegion = this.getPopularVideosByRegion.bind(this);
    this.getPopularVideosByCategory = this.getPopularVideosByCategory.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.getVideo = this.getVideo.bind(this);
    this.search = this.search.bind(this);
    this.getRelatedVideos = this.getRelatedVideos.bind(this);
    this.searchVideos = this.searchVideos.bind(this);
    this.searchPlaylists = this.searchPlaylists.bind(this);
    this.searchChannels = this.searchChannels.bind(this);
    if (key && key.length > 0) {
      this.getCommentThreads = function (videoId, sort, max, nextPageToken) {
        return getCommentThreads(httpRequest, key, videoId, sort, max, nextPageToken);
      };
      this.getComments = function (id, max, nextPageToken) {
        return getComments(httpRequest, key, id, max, nextPageToken);
      };
    }
  }
  VideoClient.prototype.getCagetories = function (regionCode) {
    if (!regionCode) {
      regionCode = 'US';
    }
    var url = this.url + "/category?regionCode=" + regionCode;
    return this.httpRequest.get(url);
  };
  VideoClient.prototype.getChannels = function (ids, fields) {
    var url = this.url + "/channels/list?id=" + ids.join(',') + "&fields=" + fields;
    return this.httpRequest.get(url).then(function (res) { return formatPublishedAt(res); });
  };
  VideoClient.prototype.getChannel = function (id, fields) {
    var _this = this;
    var c = this.channelCache[id];
    if (c) {
      return Promise.resolve(c.item);
    }
    else {
      var field = fields ? "?fields=" + fields : '';
      var url = this.url + "/channels/" + id + field;
      return this.httpRequest.get(url).then(function (channel) {
        if (channel) {
          if (channel.publishedAt) {
            channel.publishedAt = new Date(channel.publishedAt);
          }
          _this.channelCache[id] = { item: channel, timestamp: new Date() };
          removeCache(_this.channelCache, _this.maxChannel);
        }
        return channel;
      }).catch(function (err) {
        var data = (err && err.response) ? err.response : err;
        if (data && (data.status === 404 || data.status === 410)) {
          return null;
        }
        throw err;
      });
    }
  };
  VideoClient.prototype.getChannelPlaylists = function (channelId, max, nextPageToken, fields) {
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/playlists?channelId=" + channelId + "&limit=" + maxResults + pageToken + field;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: decompressItems(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.getPlaylists = function (ids, fields) {
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/playlists/list?id=" + ids.join(',') + field;
    return this.httpRequest.get(url).then(function (res) { return formatPublishedAt(res); });
  };
  VideoClient.prototype.getPlaylist = function (id, fields) {
    var _this = this;
    var c = this.playlistCache[id];
    if (c) {
      return Promise.resolve(c.item);
    }
    else {
      var field = fields ? "?fields=" + fields : '';
      var url = this.url + "/playlists/" + id + field;
      return this.httpRequest.get(url).then(function (playlist) {
        if (playlist) {
          if (playlist.publishedAt) {
            playlist.publishedAt = new Date(playlist.publishedAt);
          }
          _this.playlistCache[id] = { item: playlist, timestamp: new Date() };
          removeCache(_this.playlistCache, _this.maxPlaylist);
        }
        return playlist;
      }).catch(function (err) {
        var data = (err && err.response) ? err.response : err;
        if (data && (data.status === 404 || data.status === 410)) {
          return null;
        }
        throw err;
      });
    }
  };
  VideoClient.prototype.getPlaylistVideos = function (playlistId, max, nextPageToken, fields) {
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/videos?playlistId=" + playlistId + "&limit=" + maxResults + pageToken + field;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: decompress(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.getChannelVideos = function (channelId, max, nextPageToken, fields) {
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/videos?channelId=" + channelId + "&limit=" + maxResults + pageToken + field;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: decompress(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.getPopularVideos = function (regionCode, videoCategoryId, max, nextPageToken, fields) {
    if ((!regionCode || regionCode.length === 0) && (!videoCategoryId || videoCategoryId.length === 0)) {
      regionCode = 'US';
    }
    var regionParam = regionCode && regionCode.length > 0 ? "&regionCode=" + regionCode : '';
    var categoryParam = videoCategoryId && videoCategoryId.length > 0 ? "&categoryId=" + videoCategoryId : '';
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/videos/popular?limit=" + maxResults + pageToken + regionParam + categoryParam + field;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: decompress(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.getPopularVideosByRegion = function (regionCode, max, nextPageToken, fields) {
    return this.getPopularVideos(regionCode, undefined, max, nextPageToken, fields);
  };
  VideoClient.prototype.getPopularVideosByCategory = function (videoCategoryId, max, nextPageToken, fields) {
    return this.getPopularVideos(undefined, videoCategoryId, max, nextPageToken, fields);
  };
  VideoClient.prototype.getVideos = function (ids, fields, noSnippet) {
    if (!ids || ids.length === 0) {
      return Promise.resolve([]);
    }
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/videos/list?id=" + ids.join(',') + field;
    return this.httpRequest.get(url).then(function (res) { return formatPublishedAt(res); });
  };
  VideoClient.prototype.getRelatedVideos = function (videoId, max, nextPageToken, fields) {
    if (!videoId || videoId.length === 0) {
      var r = { list: [] };
      return Promise.resolve(r);
    }
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/videos/" + videoId + "/related?limit=" + maxResults + pageToken + field;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: decompress(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.getVideo = function (id, fields, noSnippet) {
    var field = fields ? "?fields=" + fields : '';
    var url = this.url + "/videos/" + id + field;
    return this.httpRequest.get(url).then(function (video) {
      if (video && video.publishedAt) {
        video.publishedAt = new Date(video.publishedAt);
      }
      return video;
    }).catch(function (err) {
      var data = (err && err.response) ? err.response : err;
      if (data && (data.status === 404 || data.status === 410)) {
        return null;
      }
      throw err;
    });
  };
  VideoClient.prototype.search = function (sm, max, nextPageToken) {
    var searchType = sm.type ? "&type=" + sm.type : '';
    var searchDuration = sm.type === 'video' && (sm.duration === 'long' || sm.duration === 'medium' || sm.duration === 'short') ? "&videoDuration=" + sm.duration : '';
    var searchOrder = (sm.sort === 'date' || sm.sort === 'rating' || sm.sort === 'title' || sm.sort === 'count' || sm.sort === 'viewCount') ? "&sort=" + sm.sort : '';
    var regionParam = (sm.regionCode && sm.regionCode.length > 0 ? "&regionCode=" + sm.regionCode : '');
    var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
    var maxResults = (max && max > 0 ? max : 50);
    var url = "https://www.googleapis.com/youtube/v3/search?key=" + this.key + "&part=snippet" + regionParam + "&q=" + sm.q + "&maxResults=" + maxResults + searchType + searchDuration + searchOrder + pageToken;
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubeSearch(res);
      r.list = formatThumbnail(r.list);
      return r;
    });
  };
  VideoClient.prototype.searchVideos = function (sm, max, nextPageToken, fields) {
    var searchDuration = sm.type === 'video' && (sm.duration === 'long' || sm.duration === 'medium' || sm.duration === 'short') ? "&videoDuration=" + sm.duration : '';
    var searchOrder = (sm.sort === 'date' || sm.sort === 'rating' || sm.sort === 'title' || sm.sort === 'count' || sm.sort === 'viewCount') ? "&sort=" + sm.sort : '';
    var regionParam = (sm.regionCode && sm.regionCode.length > 0 ? "&regionCode=" + sm.regionCode : '');
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var maxResults = (max && max > 0 ? max : 50);
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/videos/search?q=" + sm.q + searchDuration + regionParam + searchOrder + pageToken + field + "&limit=" + maxResults;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: decompress(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.searchPlaylists = function (sm, max, nextPageToken, fields) {
    var searchOrder = (sm.sort === 'date' || sm.sort === 'rating' || sm.sort === 'title' || sm.sort === 'count' || sm.sort === 'viewCount') ? "&sort=" + sm.sort : '';
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var maxResults = (max && max > 0 ? max : 50);
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/playlists/search?q=" + sm.q + searchOrder + pageToken + field + "&limit=" + maxResults;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: decompressItems(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.searchChannels = function (sm, max, nextPageToken, fields) {
    var searchOrder = (sm.sort === 'date' || sm.sort === 'rating' || sm.sort === 'title' || sm.sort === 'count' || sm.sort === 'viewCount') ? "&sort=" + sm.sort : '';
    var pageToken = (nextPageToken ? "&nextPageToken=" + nextPageToken : '');
    var maxResults = (max && max > 0 ? max : 50);
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/channels/search?q=" + sm.q + searchOrder + pageToken + field + "&limit=" + maxResults;
    return this.httpRequest.get(url).then(function (res) {
      formatPublishedAt(res.list);
      var r = {
        list: res.list,
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  return VideoClient;
}());
exports.VideoClient = VideoClient;
var YoutubeSyncClient = (function () {
  function YoutubeSyncClient(key, httpRequest) {
    this.key = key;
    this.httpRequest = httpRequest;
    this.getChannels = this.getChannels.bind(this);
    this.getChannel = this.getChannel.bind(this);
    this.getChannelPlaylists = this.getChannelPlaylists.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getPlaylistVideos = this.getPlaylistVideos.bind(this);
    this.getVideos = this.getVideos.bind(this);
  }
  YoutubeSyncClient.prototype.getChannels = function (ids) {
    var url = "https://www.googleapis.com/youtube/v3/channels?key=" + this.key + "&id=" + ids.join(',') + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) { return formatThumbnail(youtube_1.fromYoutubeChannels(res)); });
  };
  YoutubeSyncClient.prototype.getChannel = function (id) {
    return this.getChannels([id]).then(function (res) {
      var channel = res && res.length > 0 ? res[0] : null;
      return channel;
    });
  };
  YoutubeSyncClient.prototype.getPlaylists = function (ids) {
    var url = "https://youtube.googleapis.com/youtube/v3/playlists?key=" + this.key + "&id=" + ids.join(',') + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubePlaylists(res);
      return r.list;
    });
  };
  YoutubeSyncClient.prototype.getPlaylist = function (id) {
    return this.getPlaylists([id]).then(function (res) {
      var playlist = res && res.length > 0 ? res[0] : null;
      return playlist;
    });
  };
  YoutubeSyncClient.prototype.getChannelPlaylists = function (channelId, max, nextPageToken) {
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
    var url = "https://youtube.googleapis.com/youtube/v3/playlists?key=" + this.key + "&channelId=" + channelId + "&maxResults=" + maxResults + pageToken + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) { return youtube_1.fromYoutubePlaylists(res); });
  };
  YoutubeSyncClient.prototype.getPlaylistVideos = function (playlistId, max, nextPageToken) {
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
    var url = "https://youtube.googleapis.com/youtube/v3/playlistItems?key=" + this.key + "&playlistId=" + playlistId + "&maxResults=" + maxResults + pageToken + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubePlaylist(res);
      if (r.list) {
        r.list = r.list.filter(function (i) { return i.thumbnail; });
      }
      return r;
    });
  };
  YoutubeSyncClient.prototype.getVideos = function (ids) {
    if (!ids || ids.length === 0) {
      return Promise.resolve([]);
    }
    var strSnippet = 'snippet,';
    var url = "https://www.googleapis.com/youtube/v3/videos?key=" + this.key + "&part=" + strSnippet + "contentDetails&id=" + ids.join(',');
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubeVideos(res);
      if (!r || !r.list) {
        return [];
      }
      return r.list;
    });
  };
  return YoutubeSyncClient;
}());
exports.YoutubeSyncClient = YoutubeSyncClient;
var YoutubeClient = (function () {
  function YoutubeClient(key, httpRequest, maxChannel, maxPlaylist) {
    if (maxChannel === void 0) { maxChannel = 40; }
    if (maxPlaylist === void 0) { maxPlaylist = 200; }
    this.key = key;
    this.httpRequest = httpRequest;
    this.maxChannel = maxChannel;
    this.maxPlaylist = maxPlaylist;
    this.channelCache = {};
    this.playlistCache = {};
    this.getCagetories = this.getCagetories.bind(this);
    this.getChannels = this.getChannels.bind(this);
    this.getChannel = this.getChannel.bind(this);
    this.getChannelPlaylists = this.getChannelPlaylists.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getPlaylistVideos = this.getPlaylistVideos.bind(this);
    this.getChannelVideos = this.getChannelVideos.bind(this);
    this.getPopularVideos = this.getPopularVideos.bind(this);
    this.getPopularVideosByRegion = this.getPopularVideosByRegion.bind(this);
    this.getPopularVideosByCategory = this.getPopularVideosByCategory.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.getVideo = this.getVideo.bind(this);
    this.search = this.search.bind(this);
    this.getRelatedVideos = this.getRelatedVideos.bind(this);
    this.searchVideos = this.searchVideos.bind(this);
    this.searchPlaylists = this.searchPlaylists.bind(this);
    this.searchChannels = this.searchChannels.bind(this);
    this.getCommentThreads = this.getCommentThreads.bind(this);
    this.getComments = this.getComments.bind(this);
  }
  YoutubeClient.prototype.getCagetories = function (regionCode) {
    if (!regionCode) {
      regionCode = 'US';
    }
    var url = "https://www.googleapis.com/youtube/v3/videoCategories?key=AIzaSyDVRw8jjqyJWijg57zXSOMpUArlZGpC7bE&regionCode=" + regionCode;
    return this.httpRequest.get(url).then(function (res) { return youtube_1.fromYoutubeCategories(res); });
  };
  YoutubeClient.prototype.getChannels = function (ids) {
    var url = "https://www.googleapis.com/youtube/v3/channels?key=" + this.key + "&id=" + ids.join(',') + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) { return formatThumbnail(youtube_1.fromYoutubeChannels(res)); });
  };
  YoutubeClient.prototype.getChannel = function (id) {
    var _this = this;
    var c = this.channelCache[id];
    if (c) {
      return Promise.resolve(c.item);
    }
    else {
      return this.getChannels([id]).then(function (res) {
        var channel = res && res.length > 0 ? res[0] : null;
        if (channel) {
          var d = new Date();
          _this.channelCache[id] = { item: channel, timestamp: d };
          if (channel.customUrl && channel.customUrl.length > 0) {
            _this.channelCache[channel.customUrl] = { item: channel, timestamp: d };
          }
          removeCache(_this.channelCache, _this.maxChannel);
        }
        return channel;
      });
    }
  };
  YoutubeClient.prototype.getChannelPlaylists = function (channelId, max, nextPageToken) {
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
    var url = "https://youtube.googleapis.com/youtube/v3/playlists?key=" + this.key + "&channelId=" + channelId + "&maxResults=" + maxResults + pageToken + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) { return youtube_1.fromYoutubePlaylists(res); });
  };
  YoutubeClient.prototype.getPlaylists = function (ids) {
    var url = "https://youtube.googleapis.com/youtube/v3/playlists?key=" + this.key + "&id=" + ids.join(',') + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubePlaylists(res);
      r.list = formatBigThumbnail(r.list);
      return r.list;
    });
  };
  YoutubeClient.prototype.getPlaylist = function (id) {
    var _this = this;
    var c = this.playlistCache[id];
    if (c) {
      return Promise.resolve(c.item);
    }
    else {
      return this.getPlaylists([id]).then(function (res) {
        var playlist = res && res.length > 0 ? res[0] : null;
        if (playlist) {
          _this.playlistCache[id] = { item: playlist, timestamp: new Date() };
          removeCache(_this.playlistCache, _this.maxPlaylist);
        }
        return playlist;
      });
    }
  };
  YoutubeClient.prototype.getPlaylistVideos = function (playlistId, max, nextPageToken) {
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
    var url = "https://youtube.googleapis.com/youtube/v3/playlistItems?key=" + this.key + "&playlistId=" + playlistId + "&maxResults=" + maxResults + pageToken + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubePlaylist(res);
      r.list = formatThumbnail(r.list);
      return r;
    });
  };
  YoutubeClient.prototype.getChannelVideos = function (channelId, max, nextPageToken) {
    var _this = this;
    return this.getChannel(channelId).then(function (channel) {
      if (channel && channel.uploads) {
        return _this.getPlaylistVideos(channel.uploads, max, nextPageToken);
      }
      else {
        return { list: [] };
      }
    });
  };
  YoutubeClient.prototype.getPopularVideos = function (regionCode, videoCategoryId, max, nextPageToken) {
    if ((!regionCode || regionCode.length === 0) && (!videoCategoryId || videoCategoryId.length === 0)) {
      regionCode = 'US';
    }
    var regionParam = regionCode && regionCode.length > 0 ? "&regionCode=" + regionCode : '';
    var categoryParam = videoCategoryId && videoCategoryId.length > 0 ? "&videoCategoryId=" + videoCategoryId : '';
    var maxResults = (max && max > 0 ? max : 50);
    var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
    var url = "https://youtube.googleapis.com/youtube/v3/videos?key=" + this.key + "&chart=mostPopular" + regionParam + categoryParam + "&maxResults=" + maxResults + pageToken + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubeVideos(res);
      r.list = formatBigThumbnail(r.list);
      return r;
    });
  };
  YoutubeClient.prototype.getPopularVideosByRegion = function (regionCode, max, nextPageToken) {
    return this.getPopularVideos(regionCode, undefined, max, nextPageToken);
  };
  YoutubeClient.prototype.getPopularVideosByCategory = function (videoCategoryId, max, nextPageToken) {
    return this.getPopularVideos(undefined, videoCategoryId, max, nextPageToken);
  };
  YoutubeClient.prototype.getVideos = function (ids, fields, noSnippet) {
    if (!ids || ids.length === 0) {
      return Promise.resolve([]);
    }
    var strSnippet = (noSnippet ? '' : 'snippet,');
    var url = "https://www.googleapis.com/youtube/v3/videos?key=" + this.key + "&part=" + strSnippet + "contentDetails&id=" + ids.join(',');
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubeVideos(res);
      if (!r || !r.list) {
        return [];
      }
      return formatBigThumbnail(r.list);
    });
  };
  YoutubeClient.prototype.getVideo = function (id, fields, noSnippet) {
    return this.getVideos([id], fields, noSnippet).then(function (res) { return res && res.length > 0 ? res[0] : null; });
  };
  YoutubeClient.prototype.getCommentThreads = function (videoId, sort, max, nextPageToken) {
    return getCommentThreads(this.httpRequest, this.key, videoId, sort, max, nextPageToken);
  };
  YoutubeClient.prototype.getComments = function (id, max, nextPageToken) {
    return getComments(this.httpRequest, this.key, id, max, nextPageToken);
  };
  YoutubeClient.prototype.search = function (sm, max, nextPageToken) {
    var searchType = sm.type ? "&type=" + sm.type : '';
    var searchDuration = (sm.duration === 'long' || sm.duration === 'medium' || sm.duration === 'short') ? "&videoDuration=" + sm.duration : '';
    var s = youtube_1.getYoutubeSort(sm.sort);
    var searchOrder = (s ? "&order=" + s : '');
    var regionParam = (sm.regionCode && sm.regionCode.length > 0 ? "&regionCode=" + sm.regionCode : '');
    var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
    var maxResults = (max && max > 0 ? max : 50);
    var url = "https://www.googleapis.com/youtube/v3/search?key=" + this.key + "&part=snippet" + regionParam + "&q=" + sm.q + "&maxResults=" + maxResults + searchType + searchDuration + searchOrder + pageToken;
    return this.httpRequest.get(url).then(function (res) { return youtube_1.fromYoutubeSearch(res); });
  };
  YoutubeClient.prototype.searchVideos = function (sm, max, nextPageToken) {
    sm.type = 'video';
    return this.search(sm, max, nextPageToken);
  };
  YoutubeClient.prototype.searchPlaylists = function (sm, max, nextPageToken) {
    var s = sm;
    s.type = 'playlist';
    return this.search(s, max, nextPageToken).then(function (res) {
      var list = res.list.map(function (i) {
        var p = {
          id: i.id,
          title: i.title,
          description: i.description,
          publishedAt: i.publishedAt,
          thumbnail: i.thumbnail,
          mediumThumbnail: i.mediumThumbnail,
          highThumbnail: i.highThumbnail,
          channelId: i.channelId,
          channelTitle: i.channelTitle
        };
        return p;
      });
      return { list: list, total: res.total, limit: res.limit, nextPageToken: res.nextPageToken };
    });
  };
  YoutubeClient.prototype.searchChannels = function (sm, max, nextPageToken) {
    var s = sm;
    s.type = 'channel';
    return this.search(s, max, nextPageToken).then(function (res) {
      var list = res.list.map(function (i) {
        var p = {
          id: i.id,
          title: i.title,
          description: i.description,
          publishedAt: i.publishedAt,
          thumbnail: i.thumbnail,
          mediumThumbnail: i.mediumThumbnail,
          highThumbnail: i.highThumbnail,
          channelId: i.channelId,
          channelTitle: i.channelTitle
        };
        return p;
      });
      return { list: list, total: res.total, limit: res.limit, nextPageToken: res.nextPageToken };
    });
  };
  YoutubeClient.prototype.getRelatedVideos = function (videoId, max, nextPageToken) {
    return this.getPopularVideos('US').then(function (list) { return list; });
  };
  return YoutubeClient;
}());
exports.YoutubeClient = YoutubeClient;
var DefaultSyncService = (function () {
  function DefaultSyncService(client, repo, log) {
    this.client = client;
    this.repo = repo;
    this.log = log;
    this.syncChannel = this.syncChannel.bind(this);
    this.syncChannels = this.syncChannels.bind(this);
    this.syncPlaylist = this.syncPlaylist.bind(this);
    this.syncPlaylists = this.syncPlaylists.bind(this);
  }
  DefaultSyncService.prototype.syncChannel = function (channelId) {
    return syncChannel(channelId, this.client, this.repo, this.log);
  };
  DefaultSyncService.prototype.syncChannels = function (channelIds) {
    return syncChannels(channelIds, this.client, this.repo);
  };
  DefaultSyncService.prototype.syncPlaylist = function (playlistId, level) {
    var syncVideos = level && level < 2 ? false : true;
    return syncPlaylist(playlistId, syncVideos, this.client, this.repo, this.log);
  };
  DefaultSyncService.prototype.syncPlaylists = function (playlistIds, level) {
    var syncVideos = level && level < 2 ? false : true;
    return syncPlaylists(playlistIds, syncVideos, this.client, this.repo);
  };
  return DefaultSyncService;
}());
exports.DefaultSyncService = DefaultSyncService;
function syncChannels(channelIds, client, repo) {
  var promises = channelIds.map(function (channelId) { return syncChannel(channelId, client, repo); });
  var sum = 0;
  return Promise.all(promises).then(function (res) {
    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
      var num = res_1[_i];
      sum = sum + num;
    }
    return sum;
  });
}
exports.syncChannels = syncChannels;
function syncChannel(channelId, client, repo, log) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2, repo.getChannelSync(channelId).then(function (channelSync) {
        var res = client.getChannel(channelId).then(function (channel) {
          if (!channel) {
            return Promise.resolve(0);
          }
          else {
            return checkAndSyncUploads(channel, channelSync, client, repo);
          }
        });
        return res;
      }).catch(function (err) {
        if (log) {
          log(err);
        }
        throw err;
      })];
    });
  });
}
exports.syncChannel = syncChannel;
function checkAndSyncUploads(channel, channelSync, client, repo) {
  if (!channel.uploads || channel.uploads.length === 0) {
    return Promise.resolve(0);
  }
  else {
    var date_1 = new Date();
    var timestamp = channelSync ? channelSync.syncTime : undefined;
    var syncVideos_1 = (!channelSync || (channelSync && channelSync.level && channelSync.level >= 2)) ? true : false;
    var syncCollection_1 = (!channelSync || (channelSync && channelSync.level && channelSync.level >= 1)) ? true : false;
    return syncUploads(channel.uploads, client, repo, timestamp).then(function (r) {
      channel.lastUpload = r.timestamp;
      channel.count = r.count;
      channel.itemCount = r.all;
      return syncChannelPlaylists(channel.id, syncVideos_1, syncCollection_1, client, repo).then(function (res) {
        if (syncCollection_1) {
          channel.playlistCount = res.count;
          channel.playlistItemCount = res.all;
          channel.playlistVideoCount = res.videoCount;
          channel.playlistVideoItemCount = res.allVideoCount;
        }
        return repo.saveChannel(channel).then(function (c) {
          return repo.saveChannelSync({ id: channel.id, syncTime: date_1, uploads: channel.uploads });
        });
      });
    });
  }
}
exports.checkAndSyncUploads = checkAndSyncUploads;
function syncPlaylists(playlistIds, syncVideos, client, repo) {
  var promises = playlistIds.map(function (playlistId) { return syncPlaylist(playlistId, syncVideos, client, repo); });
  var sum = 0;
  return Promise.all(promises).then(function (res) {
    for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
      var num = res_2[_i];
      sum = sum + num;
    }
    return sum;
  });
}
exports.syncPlaylists = syncPlaylists;
function syncPlaylist(playlistId, syncVideos, client, repo, log) {
  return __awaiter(this, void 0, void 0, function () {
    var res, playlist, err_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 7, , 8]);
          return [4, syncPlaylistVideos(playlistId, syncVideos, client, repo)];
        case 1:
          res = _a.sent();
          return [4, client.getPlaylist(playlistId)];
        case 2:
          playlist = _a.sent();
          if (!playlist) return [3, 5];
          playlist.itemCount = playlist.count;
          playlist.count = res.count;
          return [4, repo.savePlaylist(playlist)];
        case 3:
          _a.sent();
          return [4, repo.savePlaylistVideos(playlistId, res.videos)];
        case 4:
          _a.sent();
          return [2, res.success];
        case 5: return [2, Promise.resolve(0)];
        case 6: return [3, 8];
        case 7:
          err_1 = _a.sent();
          if (log) {
            log(err_1);
          }
          throw err_1;
        case 8: return [2];
      }
    });
  });
}
exports.syncPlaylist = syncPlaylist;
function syncVideosOfPlaylists(playlistIds, syncVideos, saveCollection, client, repo) {
  var sum = 0;
  if (saveCollection) {
    var promises = playlistIds.map(function (id) { return syncPlaylistVideos(id, syncVideos, client, repo).then(function (r) { return repo.savePlaylistVideos(id, r.videos); }); });
    return Promise.all(promises).then(function (res) {
      for (var _i = 0, res_3 = res; _i < res_3.length; _i++) {
        var num = res_3[_i];
        sum = sum + num;
      }
      return sum;
    });
  }
  else {
    var promises = playlistIds.map(function (id) { return syncPlaylistVideos(id, syncVideos, client, repo); });
    return Promise.all(promises).then(function (res) {
      for (var _i = 0, res_4 = res; _i < res_4.length; _i++) {
        var num = res_4[_i];
        sum = sum + num.success;
      }
      return sum;
    });
  }
}
exports.syncVideosOfPlaylists = syncVideosOfPlaylists;
function syncChannelPlaylists(channelId, syncVideos, saveCollection, client, repo) {
  return __awaiter(this, void 0, void 0, function () {
    var nextPageToken, count, all, allVideoCount, channelPlaylists, playlistIds, _i, _a, p;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          nextPageToken = '';
          count = 0;
          all = 0;
          allVideoCount = 0;
          _b.label = 1;
        case 1:
          if (!(nextPageToken !== undefined)) return [3, 5];
          return [4, client.getChannelPlaylists(channelId, 50, nextPageToken)];
        case 2:
          channelPlaylists = _b.sent();
          all = channelPlaylists.total ? channelPlaylists.total : 0;
          count = count + channelPlaylists.list.length;
          playlistIds = [];
          for (_i = 0, _a = channelPlaylists.list; _i < _a.length; _i++) {
            p = _a[_i];
            playlistIds.push(p.id);
            if (p.count) {
              allVideoCount = allVideoCount + p.count;
            }
          }
          nextPageToken = channelPlaylists.nextPageToken;
          return [4, repo.savePlaylists(channelPlaylists.list)];
        case 3:
          _b.sent();
          return [4, syncVideosOfPlaylists(playlistIds, syncVideos, saveCollection, client, repo)];
        case 4:
          _b.sent();
          return [3, 1];
        case 5: return [2, { count: count, all: all, allVideoCount: allVideoCount }];
      }
    });
  });
}
exports.syncChannelPlaylists = syncChannelPlaylists;
function syncPlaylistVideos(playlistId, syncVideos, client, repo) {
  return __awaiter(this, void 0, void 0, function () {
    var nextPageToken, success, count, all, newVideoIds, playlistVideos, videoIds, getVideos, r;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          nextPageToken = '';
          success = 0;
          count = 0;
          all = 0;
          newVideoIds = [];
          _a.label = 1;
        case 1:
          if (!(nextPageToken !== undefined)) return [3, 4];
          return [4, client.getPlaylistVideos(playlistId, 50, nextPageToken)];
        case 2:
          playlistVideos = _a.sent();
          if (playlistVideos.total) {
            all = playlistVideos.total;
          }
          count = count + playlistVideos.list.length;
          videoIds = playlistVideos.list.map(function (item) { return item.id; });
          newVideoIds = newVideoIds.concat(videoIds);
          getVideos = syncVideos ? client.getVideos : undefined;
          return [4, saveVideos(playlistVideos.list, getVideos, repo)];
        case 3:
          r = _a.sent();
          success = success + r;
          nextPageToken = playlistVideos.nextPageToken;
          return [3, 1];
        case 4: return [2, { success: success, count: count, all: all, videos: newVideoIds }];
      }
    });
  });
}
exports.syncPlaylistVideos = syncPlaylistVideos;
function syncUploads(uploads, client, repo, timestamp) {
  return __awaiter(this, void 0, void 0, function () {
    var nextPageToken, success, count, all, last, playlistVideos, newVideos, r;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          nextPageToken = '';
          success = 0;
          count = 0;
          all = 0;
          _a.label = 1;
        case 1:
          if (!(nextPageToken !== undefined)) return [3, 4];
          return [4, client.getPlaylistVideos(uploads, 50, nextPageToken)];
        case 2:
          playlistVideos = _a.sent();
          if (playlistVideos.total) {
            all = playlistVideos.total;
          }
          count = count + playlistVideos.list.length;
          if (!last && playlistVideos.list.length > 0) {
            last = playlistVideos.list[0].publishedAt;
          }
          newVideos = sync_1.getNewVideos(playlistVideos.list, timestamp);
          nextPageToken = playlistVideos.list.length > newVideos.length ? undefined : playlistVideos.nextPageToken;
          return [4, saveVideos(newVideos, client.getVideos, repo)];
        case 3:
          r = _a.sent();
          success = success + r;
          return [3, 1];
        case 4: return [2, { success: success, count: success, all: all, timestamp: last, videos: [] }];
      }
    });
  });
}
exports.syncUploads = syncUploads;
function saveVideos(newVideos, getVideos, repo) {
  if (!newVideos || newVideos.length === 0) {
    return Promise.resolve(0);
  }
  else {
    if (!repo || !getVideos) {
      return Promise.resolve(newVideos.length);
    }
    else {
      var videoIds_1 = newVideos.map(function (item) { return item.id; });
      return repo.getVideoIds(videoIds_1).then(function (ids) {
        var newIds = sync_1.notIn(videoIds_1, ids);
        if (newIds.length === 0) {
          return Promise.resolve(0);
        }
        else {
          return getVideos(newIds).then(function (videos) {
            if (videos && videos.length > 0) {
              return repo.saveVideos(videos).then(function (r) { return videos.length; });
            }
            else {
              return Promise.resolve(0);
            }
          });
        }
      });
    }
  }
}
exports.saveVideos = saveVideos;
function removeCache(cache, max) {
  var keys = Object.keys(cache);
  if (keys.length <= max) {
    return 0;
  }
  var lastKey = '';
  var count = 0;
  while (true) {
    var last = new Date();
    for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
      var key = keys_3[_i];
      var obj = cache[key];
      if (obj.timestamp.getTime() > last.getTime()) {
        lastKey = key;
        last = obj.timestamp;
      }
    }
    delete cache[lastKey];
    count = count + 1;
    keys = Object.keys(cache);
    if (keys.length <= max) {
      return count;
    }
  }
}
exports.removeCache = removeCache;
exports.nothumbnail = 'https://i.ytimg.com/img/no_thumbnail.jpg';
function formatThumbnail(t) {
  if (!t) {
    return t;
  }
  for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
    var obj = t_1[_i];
    if (!obj.thumbnail) {
      obj.thumbnail = exports.nothumbnail;
    }
    if (!obj.mediumThumbnail) {
      obj.mediumThumbnail = exports.nothumbnail;
    }
    if (!obj.highThumbnail) {
      obj.highThumbnail = exports.nothumbnail;
    }
  }
  return t;
}
exports.formatThumbnail = formatThumbnail;
function formatBigThumbnail(t) {
  if (!t) {
    return t;
  }
  for (var _i = 0, t_2 = t; _i < t_2.length; _i++) {
    var obj = t_2[_i];
    if (!obj.thumbnail) {
      obj.thumbnail = exports.nothumbnail;
    }
    if (!obj.mediumThumbnail) {
      obj.mediumThumbnail = exports.nothumbnail;
    }
    if (!obj.highThumbnail) {
      obj.highThumbnail = exports.nothumbnail;
    }
    if (!obj.standardThumbnail) {
      obj.standardThumbnail = exports.nothumbnail;
    }
    if (!obj.maxresThumbnail) {
      obj.maxresThumbnail = exports.nothumbnail;
    }
  }
  return t;
}
exports.formatBigThumbnail = formatBigThumbnail;
function decompress(items) {
  for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
    var i = items_1[_i];
    i.mediumThumbnail = "https://i.ytimg.com/vi/" + i.id + "/mqdefault.jpg";
    i.highThumbnail = "https://i.ytimg.com/vi/" + i.id + "/hqdefault.jpg";
    i.thumbnail = "https://i.ytimg.com/vi/" + i.id + "/default.jpg";
    i['standardThumbnail'] = "https://i.ytimg.com/vi/" + i.id + "/sddefault.jpg";
    i['maxresThumbnail'] = "https://i.ytimg.com/vi/" + i.id + "/maxresdefault.jpg";
  }
  return items;
}
exports.decompress = decompress;
exports.thumbnails = ['thumbnail', 'mediumThumbnail', 'highThumbnail', 'maxresThumbnail', 'standardThumbnail'];
exports.thumbnailNames = ['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'];
function decompressItems(items) {
  for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
    var j = items_2[_i];
    var item = j;
    for (var i = 0; i < exports.thumbnails.length; i++) {
      var a = exports.thumbnails[i];
      if (item[a] && item[a].length > 0 && item[a].length < 36) {
        var u = "https://i.ytimg.com/vi/" + item[a] + "/" + exports.thumbnailNames[i] + ".jpg";
        item[a] = u;
      }
    }
  }
  return items;
}
exports.decompressItems = decompressItems;
function formatPublishedAt(li) {
  if (li && li.length > 0) {
    for (var _i = 0, li_1 = li; _i < li_1.length; _i++) {
      var i = li_1[_i];
      if (i.publishedAt) {
        i.publishedAt = new Date(i.publishedAt);
      }
    }
  }
  return li;
}
exports.formatPublishedAt = formatPublishedAt;
function getSubcriptions(request, key, channelId, mine, max, nextPageToken) {
  var maxResults = (max && max > 0 ? max : 4);
  var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
  var mineStr = (mine ? "&mine=" + mine : '');
  var channel = (channelId && channelId.length > 0) ? "&channelId=" + channelId : '';
  var url = "https://youtube.googleapis.com/youtube/v3/subscriptions?key=" + key + mineStr + channel + "&maxResults=" + maxResults + pageToken + "&part=snippet";
  return request.get(url).then(function (res) {
    var r = {
      list: youtube_1.fromYoutubeChannels(res),
      nextPageToken: res.nextPageToken,
    };
    return r;
  });
}
exports.getSubcriptions = getSubcriptions;
function getCommentThreads(request, key, videoId, sort, max, nextPageToken) {
  var orderParam = (sort === 'relevance' ? "&order=" + sort : '');
  var maxResults = (max && max > 0 ? max : 20);
  var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
  var url = "https://www.googleapis.com/youtube/v3/commentThreads?key=" + key + "&videoId=" + videoId + orderParam + "&maxResults=" + maxResults + pageToken + "&part=snippet";
  return request.get(url).then(function (res) { return fromYoutubeCommentThreads(res); });
}
exports.getCommentThreads = getCommentThreads;
function getComments(request, key, id, max, nextPageToken) {
  var maxResults = (max && max > 0 ? max : 20);
  var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
  var url = "https://www.googleapis.com/youtube/v3/comments?key=" + key + "&parentId=" + id + "&maxResults=" + maxResults + pageToken + "&part=snippet";
  return request.get(url).then(function (res) { return fromYoutubeComments(res); });
}
exports.getComments = getComments;
function fromYoutubeCommentThreads(res) {
  var list = res.items.filter(function (i) { return i.snippet; }).map(function (item) {
    var snippet = item.snippet;
    var c = snippet.topLevelComment;
    var sn = c.snippet;
    var i = {
      id: item.id,
      videoId: snippet.videoId,
      textDisplay: sn.textDisplay,
      textOriginal: sn.textOriginal,
      authorDisplayName: sn.authorDisplayName,
      authorProfileImageUrl: sn.authorProfileImageUrl,
      authorChannelUrl: sn.authorProfileImageUrl,
      authorChannelId: sn.authorChannelId.value,
      canRate: sn.canRate,
      viewerRating: sn.viewerRating,
      likeCount: sn.likeCount,
      publishedAt: sn.publishedAt,
      updatedAt: sn.updatedAt,
      canReply: snippet.canReply,
      totalReplyCount: snippet.totalReplyCount,
      isPublic: snippet.isPublic
    };
    return i;
  });
  return { list: list, total: res.pageInfo.totalResults, limit: res.pageInfo.resultsPerPage, nextPageToken: res.nextPageToken };
}
exports.fromYoutubeCommentThreads = fromYoutubeCommentThreads;
function fromYoutubeComments(res) {
  var list = res.items.filter(function (i) { return i.snippet; }).map(function (item) {
    var snippet = item.snippet;
    var i = {
      id: item.id,
      parentId: snippet.parentId,
      textDisplay: snippet.textDisplay,
      textOriginal: snippet.textOriginal,
      authorDisplayName: snippet.authorDisplayName,
      authorProfileImageUrl: snippet.authorProfileImageUrl,
      authorChannelUrl: snippet.authorProfileImageUrl,
      authorChannelId: snippet.authorChannelId.value,
      canRate: snippet.canRate,
      viewerRating: snippet.viewerRating,
      likeCount: snippet.likeCount,
      publishedAt: snippet.publishedAt,
      updatedAt: snippet.updatedAt
    };
    return i;
  });
  return { list: list, total: res.pageInfo.totalResults, limit: res.pageInfo.resultsPerPage, nextPageToken: res.nextPageToken };
}
exports.fromYoutubeComments = fromYoutubeComments;
