"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_client_1 = require("./common-client");
var youtube_1 = require("./youtube");
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
    return this.httpRequest.get(url).then(function (res) { return common_client_1.formatThumbnail(youtube_1.fromYoutubeChannels(res)); });
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
          common_client_1.removeCache(_this.channelCache, _this.maxChannel);
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
      r.list = common_client_1.formatBigThumbnail(r.list);
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
          common_client_1.removeCache(_this.playlistCache, _this.maxPlaylist);
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
      r.list = common_client_1.formatThumbnail(r.list);
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
      r.list = common_client_1.formatBigThumbnail(r.list);
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
      return common_client_1.formatBigThumbnail(r.list);
    });
  };
  YoutubeClient.prototype.getVideo = function (id, fields, noSnippet) {
    return this.getVideos([id], fields, noSnippet).then(function (res) { return res && res.length > 0 ? res[0] : null; });
  };
  YoutubeClient.prototype.getCommentThreads = function (videoId, sort, max, nextPageToken) {
    return common_client_1.getCommentThreads(this.httpRequest, this.key, videoId, sort, max, nextPageToken);
  };
  YoutubeClient.prototype.getComments = function (id, max, nextPageToken) {
    return common_client_1.getComments(this.httpRequest, this.key, id, max, nextPageToken);
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
