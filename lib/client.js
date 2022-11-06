"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_client_1 = require("./common-client");
var youtube_1 = require("./youtube");
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
        return common_client_1.getCommentThreads(httpRequest, key, videoId, sort, max, nextPageToken);
      };
      this.getComments = function (id, max, nextPageToken) {
        return common_client_1.getComments(httpRequest, key, id, max, nextPageToken);
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
    return this.httpRequest.get(url).then(function (res) { return common_client_1.formatPublishedAt(res); });
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
          common_client_1.removeCache(_this.channelCache, _this.maxChannel);
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
      common_client_1.formatPublishedAt(res.list);
      var r = {
        list: common_client_1.decompressItems(res.list),
        nextPageToken: res.nextPageToken,
      };
      return r;
    });
  };
  VideoClient.prototype.getPlaylists = function (ids, fields) {
    var field = fields ? "&fields=" + fields : '';
    var url = this.url + "/playlists/list?id=" + ids.join(',') + field;
    return this.httpRequest.get(url).then(function (res) { return common_client_1.formatPublishedAt(res); });
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
          common_client_1.removeCache(_this.playlistCache, _this.maxPlaylist);
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
      common_client_1.formatPublishedAt(res.list);
      var r = {
        list: common_client_1.decompress(res.list),
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
      common_client_1.formatPublishedAt(res.list);
      var r = {
        list: common_client_1.decompress(res.list),
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
      common_client_1.formatPublishedAt(res.list);
      var r = {
        list: common_client_1.decompress(res.list),
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
    return this.httpRequest.get(url).then(function (res) { return common_client_1.formatPublishedAt(res); });
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
      common_client_1.formatPublishedAt(res.list);
      var r = {
        list: common_client_1.decompress(res.list),
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
      r.list = common_client_1.formatThumbnail(r.list);
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
      common_client_1.formatPublishedAt(res.list);
      var r = {
        list: common_client_1.decompress(res.list),
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
      common_client_1.formatPublishedAt(res.list);
      var r = {
        list: common_client_1.decompressItems(res.list),
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
      common_client_1.formatPublishedAt(res.list);
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
