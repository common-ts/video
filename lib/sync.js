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
Object.defineProperty(exports, "__esModule", { value: true });
var youtube_1 = require("./youtube");
var SubscriptionsClient = (function () {
  function SubscriptionsClient(key, httpRequest) {
    this.key = key;
    this.httpRequest = httpRequest;
    this.getSubscriptions = this.getSubscriptions.bind(this);
  }
  SubscriptionsClient.prototype.getSubscriptions = function (channelId) {
    return getSubcriptionsFromYoutube(this.httpRequest, this.key, channelId);
  };
  return SubscriptionsClient;
}());
exports.SubscriptionsClient = SubscriptionsClient;
var YoutubeSyncClient = (function () {
  function YoutubeSyncClient(key, httpRequest, compress) {
    this.key = key;
    this.httpRequest = httpRequest;
    this.compress = compress;
    this.getChannels = this.getChannels.bind(this);
    this.getChannel = this.getChannel.bind(this);
    this.getChannelPlaylists = this.getChannelPlaylists.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getPlaylistVideos = this.getPlaylistVideos.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.getSubscriptions = this.getSubscriptions.bind(this);
  }
  YoutubeSyncClient.prototype.getChannels = function (ids) {
    var url = "https://www.googleapis.com/youtube/v3/channels?key=" + this.key + "&id=" + ids.join(',') + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) { return formatThumbnail(youtube_1.fromYoutubeChannels(res)); });
  };
  YoutubeSyncClient.prototype.getSubscriptions = function (channelId) {
    return getSubcriptionsFromYoutube(this.httpRequest, this.key, channelId);
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
    var part = '&part=contentDetails';
    var url = "https://youtube.googleapis.com/youtube/v3/playlistItems?key=" + this.key + "&playlistId=" + playlistId + "&maxResults=" + maxResults + pageToken + part;
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubePlaylist(res, true);
      if (r.list) {
        r.list = r.list.filter(function (i) { return i.id; });
      }
      return r;
    });
  };
  YoutubeSyncClient.prototype.getVideos = function (ids) {
    var _this = this;
    if (!ids || ids.length === 0) {
      return Promise.resolve([]);
    }
    var strSnippet = 'snippet,';
    var url = "https://www.googleapis.com/youtube/v3/videos?key=" + this.key + "&part=" + strSnippet + "contentDetails&id=" + ids.join(',');
    return this.httpRequest.get(url).then(function (res) {
      var r = youtube_1.fromYoutubeVideos(res, _this.compress);
      if (!r || !r.list) {
        return [];
      }
      return r.list;
    });
  };
  return YoutubeSyncClient;
}());
exports.YoutubeSyncClient = YoutubeSyncClient;
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
        return client.getSubscriptions(channel.id).then(function (sub) {
          if (sub) {
            channel.channels = sub.map(function (item) { return item.id; });
          }
          return repo.saveChannel(channel).then(function (c) {
            return repo.saveChannelSync({ id: channel.id, syncTime: date_1, uploads: channel.uploads });
          });
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
          _a.trys.push([0, 5, , 6]);
          return [4, syncPlaylistVideos(playlistId, syncVideos, client, repo)];
        case 1:
          res = _a.sent();
          return [4, client.getPlaylist(playlistId)];
        case 2:
          playlist = _a.sent();
          playlist.itemCount = playlist.count;
          playlist.count = res.count;
          return [4, repo.savePlaylist(playlist)];
        case 3:
          _a.sent();
          return [4, repo.savePlaylistVideos(playlistId, res.videos)];
        case 4:
          _a.sent();
          return [2, res.success];
        case 5:
          err_1 = _a.sent();
          if (log) {
            log(err_1);
          }
          throw err_1;
        case 6: return [2];
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
          all = channelPlaylists.total;
          count = count + channelPlaylists.list.length;
          playlistIds = [];
          for (_i = 0, _a = channelPlaylists.list; _i < _a.length; _i++) {
            p = _a[_i];
            playlistIds.push(p.id);
            allVideoCount = allVideoCount + p.count;
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
          all = playlistVideos.total;
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
          all = playlistVideos.total;
          count = count + playlistVideos.list.length;
          if (!last && playlistVideos.list.length > 0) {
            last = playlistVideos.list[0].publishedAt;
          }
          newVideos = getNewVideos(playlistVideos.list, timestamp);
          nextPageToken = playlistVideos.list.length > newVideos.length ? undefined : playlistVideos.nextPageToken;
          return [4, saveVideos(newVideos, client.getVideos, repo)];
        case 3:
          r = _a.sent();
          success = success + r;
          return [3, 1];
        case 4: return [2, { count: success, all: all, timestamp: last }];
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
        var newIds = notIn(videoIds_1, ids);
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
function getSubcriptions(httpRequest, key, channelId, mine, max, nextPageToken) {
  var maxResults = (max && max > 0 ? max : 4);
  var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
  var mineStr = (mine ? "&mine=" + mine : '');
  var channel = (channelId && channelId.length > 0) ? "&channelId=" + channelId : '';
  var url = "https://youtube.googleapis.com/youtube/v3/subscriptions?key=" + key + mineStr + channel + "&maxResults=" + maxResults + pageToken + "&part=snippet";
  return httpRequest.get(url).then(function (res) {
    var r = {
      list: youtube_1.fromYoutubeSubscriptions(res),
      nextPageToken: res.nextPageToken,
    };
    return r;
  });
}
exports.getSubcriptions = getSubcriptions;
function getSubcriptionsFromYoutube(httpRequest, key, channelId) {
  return __awaiter(this, void 0, void 0, function () {
    var channels, nextPageToken, count, allChannelCount, subscriptions, _i, _a, p, channelSubscriptions, err_2, channelSubscriptions;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          channels = [];
          nextPageToken = '';
          count = 0;
          allChannelCount = 0;
          _b.label = 1;
        case 1:
          _b.trys.push([1, 5, , 6]);
          _b.label = 2;
        case 2:
          if (!(nextPageToken !== undefined)) return [3, 4];
          return [4, getSubcriptions(httpRequest, key, channelId, undefined, 2, nextPageToken)];
        case 3:
          subscriptions = _b.sent();
          count = count + subscriptions.list.length;
          for (_i = 0, _a = subscriptions.list; _i < _a.length; _i++) {
            p = _a[_i];
            channels.push(p);
            allChannelCount = allChannelCount + p.count;
          }
          nextPageToken = subscriptions.nextPageToken;
          return [3, 2];
        case 4:
          channelSubscriptions = {
            id: channelId,
            data: channels
          };
          return [2, channelSubscriptions.data];
        case 5:
          err_2 = _b.sent();
          if (err_2) {
            channelSubscriptions = {
              id: channelId,
              data: []
            };
            return [2, channelSubscriptions.data];
          }
          return [3, 6];
        case 6: return [2];
      }
    });
  });
}
exports.getSubcriptionsFromYoutube = getSubcriptionsFromYoutube;
function getNewVideos(videos, lastSynchronizedTime) {
  if (!lastSynchronizedTime) {
    return videos;
  }
  var timestamp = addSeconds(lastSynchronizedTime, -1800);
  var time = timestamp.getTime();
  var newVideos = [];
  for (var _i = 0, videos_1 = videos; _i < videos_1.length; _i++) {
    var i = videos_1[_i];
    if (i.publishedAt.getTime() >= time) {
      newVideos.push(i);
    }
    else {
      return newVideos;
    }
  }
  return newVideos;
}
exports.getNewVideos = getNewVideos;
function addSeconds(date, number) {
  var newDate = new Date(date);
  newDate.setSeconds(newDate.getSeconds() + number);
  return newDate;
}
exports.addSeconds = addSeconds;
function notIn(ids, subIds, nosort) {
  if (nosort) {
    var newIds = [];
    for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
      var id = ids_1[_i];
      if (!subIds.includes(id)) {
        newIds.push(id);
      }
    }
    return newIds;
  }
  else {
    var newIds = [];
    for (var _a = 0, ids_2 = ids; _a < ids_2.length; _a++) {
      var id = ids_2[_a];
      var i = binarySearch(subIds, id);
      if (i < 0) {
        newIds.push(id);
      }
    }
    return newIds;
  }
}
exports.notIn = notIn;
function binarySearch(items, value) {
  var startIndex = 0;
  var stopIndex = items.length - 1;
  var middle = Math.floor((stopIndex + startIndex) / 2);
  while (items[middle] !== value && startIndex < stopIndex) {
    if (value < items[middle]) {
      stopIndex = middle - 1;
    }
    else if (value > items[middle]) {
      startIndex = middle + 1;
    }
    middle = Math.floor((stopIndex + startIndex) / 2);
  }
  return (items[middle] !== value) ? -1 : middle;
}
exports.binarySearch = binarySearch;
