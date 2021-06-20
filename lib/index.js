"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YoutubeClient = (function () {
  function YoutubeClient(key, httpRequest) {
    this.key = key;
    this.httpRequest = httpRequest;
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.getVideo = this.getVideo.bind(this);
  }
  YoutubeClient.prototype.getPlaylists = function (channelId, max) {
    var maxResults = (max && max > 0 ? max : 1000);
    var url = "https://youtube.googleapis.com/youtube/v3/playlists?key=" + this.key + "&channelId=" + channelId + "&maxResults=" + maxResults + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) { return fromYoutubePlaylists(res); });
  };
  YoutubeClient.prototype.getPlaylist = function (playlistId, max) {
    var maxResults = (max && max > 0 ? max : 1000);
    var url = "https://youtube.googleapis.com/youtube/v3/playlistItems?key=" + this.key + "&playlistId=" + playlistId + "&maxResults=" + maxResults + "&part=snippet,contentDetails";
    return this.httpRequest.get(url).then(function (res) { return fromYoutubePlaylist(res); });
  };
  YoutubeClient.prototype.getVideos = function (ids, noSnippet) {
    if (!ids || ids.length === 0) {
      return Promise.resolve([]);
    }
    var strSnippet = (noSnippet ? '' : 'snippet,');
    var url = "https://www.googleapis.com/youtube/v3/videos?key=" + this.key + "&part=" + strSnippet + "contentDetails&id=" + ids.join(',');
    return this.httpRequest.get(url).then(function (res) { return fromYoutubeVideos(res); });
  };
  YoutubeClient.prototype.getVideo = function (id, noSnippet) {
    return this.getVideos([id], noSnippet).then(function (res) { return res.length > 0 ? res[0] : null; });
  };
  return YoutubeClient;
}());
exports.YoutubeClient = YoutubeClient;
function fromYoutubePlaylists(res) {
  return res.items.map(function (item) {
    var snippet = item.snippet;
    var thumbnails = snippet.thumbnails;
    var i = {
      id: item.id,
      title: snippet.title,
      localizedTitle: snippet.localized ? snippet.localized.title : '',
      localizedDescription: snippet.localized ? snippet.localized.description : '',
      description: snippet.description,
      publishedAt: snippet.publishedAt,
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      thumbnail: thumbnails.default ? thumbnails.default.url : '',
      mediumThumbnail: thumbnails.medium ? thumbnails.medium.url : '',
      highThumbnail: thumbnails.high ? thumbnails.high.url : '',
      standardThumbnail: thumbnails.standard ? thumbnails.standard.url : '',
      maxresThumbnail: thumbnails.maxres ? thumbnails.maxres.url : '',
      itemCount: item.contentDetails ? item.contentDetails.itemCount : 0
    };
    return i;
  });
}
exports.fromYoutubePlaylists = fromYoutubePlaylists;
function fromYoutubePlaylist(res) {
  return res.items.map(function (item) {
    var snippet = item.snippet;
    var thumbnails = snippet.thumbnails;
    var content = item.contentDetails;
    var i = {
      title: snippet.title,
      description: snippet.description,
      localizedTitle: snippet.localized ? snippet.localized.title : '',
      localizedDescription: snippet.localized ? snippet.localized.description : '',
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      thumbnail: thumbnails.default ? thumbnails.default.url : '',
      mediumThumbnail: thumbnails.medium ? thumbnails.medium.url : '',
      highThumbnail: thumbnails.high ? thumbnails.high.url : '',
      standardThumbnail: thumbnails.standard ? thumbnails.standard.url : '',
      maxresThumbnail: thumbnails.maxres ? thumbnails.maxres.url : '',
      id: content ? content.videoId : '',
      publishedAt: content ? content.videoPublishedAt : undefined,
      playlistId: snippet.playlistId,
      position: snippet.position,
      videoOwnerChannelId: snippet.videoOwnerChannelId,
      videoOwnerChannelTitle: snippet.videoOwnerChannelTitle
    };
    return i;
  });
}
exports.fromYoutubePlaylist = fromYoutubePlaylist;
function fromYoutubeVideos(res) {
  return res.items.map(function (item) {
    var snippet = item.snippet;
    var content = item.contentDetails;
    if (snippet) {
      var thumbnails = snippet.thumbnails;
      var i = {
        id: item.id,
        title: snippet.title,
        publishedAt: snippet.publishedAt,
        description: snippet.description,
        localizedTitle: snippet.localized ? snippet.localized.title : '',
        localizedDescription: snippet.localized ? snippet.localized.description : '',
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        thumbnail: thumbnails.default ? thumbnails.default.url : '',
        mediumThumbnail: thumbnails.medium ? thumbnails.medium.url : '',
        highThumbnail: thumbnails.high ? thumbnails.high.url : '',
        standardThumbnail: thumbnails.standard ? thumbnails.standard.url : '',
        maxresThumbnail: thumbnails.maxres ? thumbnails.maxres.url : '',
        tags: snippet.tags,
        categoryId: snippet.categoryId,
        liveBroadcastContent: snippet.liveBroadcastContent,
        defaultLanguage: snippet.defaultLanguage,
        defaultAudioLanguage: snippet.defaultAudioLanguage,
        duration: calculateDuration(content.duration),
        dimension: content.dimension,
        definition: content.definition === 'hd' ? 5 : 4,
        caption: content.caption === 'true' ? true : undefined,
        licensedContent: content.licensedContent,
        projection: content.projection === 'rectangular' ? undefined : 'p'
      };
      return i;
    }
    else {
      var i = {
        id: item.id,
        duration: calculateDuration(content.duration),
        dimension: content.dimension,
        definition: content.definition === 'hd' ? 5 : 3,
        caption: content.caption === 'true' ? true : undefined,
        licensedContent: content.licensedContent,
        projection: content.projection === 'rectangular' ? undefined : 'p'
      };
      return i;
    }
  });
}
exports.fromYoutubeVideos = fromYoutubeVideos;
function calculateDuration(d) {
  if (!d) {
    return 0;
  }
  var k = d.split('M');
  if (k.length < 2) {
    return 0;
  }
  var a = k[1].substr(0, k[1].length - 1);
  var x = k[0].split('H');
  var b = (x.length === 1 ? k[0].substr(2) : x[1]);
  if (!isNaN(a) && !isNaN(b)) {
    var a1 = parseFloat(a);
    var a2 = parseFloat(b);
    if (x.length === 1) {
      return a2 * 60 + a1;
    }
    else {
      var c = x[0].substr(2);
      if (!isNaN(c)) {
        var a3 = parseFloat(c);
        return a3 * 3600 + a2 * 60 + a1;
      }
      else {
        return 0;
      }
    }
  }
  return 0;
}
exports.calculateDuration = calculateDuration;
