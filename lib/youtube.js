"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function calculateDuration(d) {
  if (!d) {
    return 0;
  }
  var k = d.split('M');
  if (k.length < 2) {
    var g = d.split('H');
    if (g.length < 2) {
      var a0 = d.substr(2, d.length - 3);
      var a1 = parseFloat(a0);
      if (d.endsWith('S')) {
        return a1;
      }
      else {
        return a1 * 3600;
      }
    }
    else {
      var a0 = d.substr(2, d.length - 3);
      var a3 = parseFloat(a0);
      return a3 * 3600;
    }
  }
  var a = k[1].substr(0, k[1].length - 1);
  if (a.length === 0) {
    a = '0';
  }
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
exports.youtubeSortMap = {
  publishedAt: 'date',
  rank: 'rating',
  count: 'videoCount'
};
function getYoutubeSort(s) {
  if (!s || s.length === 0) {
    return undefined;
  }
  var s2 = exports.youtubeSortMap[s];
  if (s2) {
    return s2;
  }
  if (s === 'date' || s === 'rating' || s === 'title' || s === 'videoCount' || s === 'viewCount') {
    return s;
  }
  return undefined;
}
exports.getYoutubeSort = getYoutubeSort;
function fromYoutubeCategories(res) {
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
function fromYoutubeChannels(res) {
  if (!res || !res.items || res.items.length === 0) {
    return [];
  }
  return res.items.filter(function (i) { return i.snippet; }).map(function (item) {
    var snippet = item.snippet;
    var thumbnail = snippet.thumbnails;
    var i = {
      id: item.id,
      title: snippet.title,
      description: snippet.description,
      publishedAt: new Date(snippet.publishedAt),
      customUrl: snippet.customUrl,
      country: snippet.country,
      localizedTitle: snippet.localized ? snippet.localized.title : '',
      localizedDescription: snippet.localized ? snippet.localized.description : ''
    };
    if (thumbnail) {
      i.thumbnail = thumbnail.default ? thumbnail.default.url : undefined;
      i.mediumThumbnail = thumbnail.medium ? thumbnail.medium.url : undefined;
      i.highThumbnail = thumbnail.high ? thumbnail.high.url : undefined;
    }
    if (item.contentDetails && item.contentDetails.relatedPlaylists) {
      var r = item.contentDetails.relatedPlaylists;
      i.likes = r.likes;
      i.favorites = r.favorites;
      i.uploads = r.uploads;
    }
    return i;
  });
}
exports.fromYoutubeChannels = fromYoutubeChannels;
function fromYoutubePlaylists(res) {
  if (!res || !res.items || res.items.length === 0) {
    return { list: [], total: 0, limit: 0 };
  }
  var list = res.items.filter(function (i) { return i.snippet; }).map(function (item) {
    var snippet = item.snippet;
    var thumbnail = snippet.thumbnails;
    var i = {
      id: item.id,
      title: snippet.title,
      localizedTitle: snippet.localized ? snippet.localized.title : '',
      localizedDescription: snippet.localized ? snippet.localized.description : '',
      description: snippet.description,
      publishedAt: new Date(snippet.publishedAt),
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      count: item.contentDetails ? item.contentDetails.itemCount : 0
    };
    if (thumbnail) {
      i.thumbnail = thumbnail.default ? thumbnail.default.url : undefined;
      i.mediumThumbnail = thumbnail.medium ? thumbnail.medium.url : undefined;
      i.highThumbnail = thumbnail.high ? thumbnail.high.url : undefined;
      i.standardThumbnail = thumbnail.standard ? thumbnail.standard.url : undefined;
      i.maxresThumbnail = thumbnail.maxres ? thumbnail.maxres.url : undefined;
    }
    return i;
  });
  return { list: list, total: res.pageInfo.totalResults, limit: res.pageInfo.resultsPerPage, nextPageToken: res.nextPageToken };
}
exports.fromYoutubePlaylists = fromYoutubePlaylists;
function fromYoutubePlaylist(res) {
  var list = res.items.filter(function (i) { return i.snippet; }).map(function (item) {
    var snippet = item.snippet;
    var thumbnail = snippet.thumbnails;
    var content = item.contentDetails;
    var i = {
      title: snippet.title ? snippet.title : '',
      description: snippet.description ? snippet.description : '',
      localizedTitle: snippet.localized ? snippet.localized.title : '',
      localizedDescription: snippet.localized ? snippet.localized.description : '',
      channelId: snippet.channelId ? snippet.channelId : '',
      channelTitle: snippet.channelTitle ? snippet.channelTitle : '',
      id: content ? content.videoId : '',
      publishedAt: new Date(content.videoPublishedAt),
      playlistId: snippet.playlistId ? snippet.playlistId : '',
      position: snippet.position ? snippet.position : 0,
      videoOwnerChannelId: snippet.videoOwnerChannelId ? snippet.videoOwnerChannelId : '',
      videoOwnerChannelTitle: snippet.videoOwnerChannelTitle ? snippet.videoOwnerChannelTitle : ''
    };
    if (thumbnail) {
      i.thumbnail = thumbnail.default ? thumbnail.default.url : undefined;
      i.mediumThumbnail = thumbnail.medium ? thumbnail.medium.url : undefined;
      i.highThumbnail = thumbnail.high ? thumbnail.high.url : undefined;
      i.standardThumbnail = thumbnail.standard ? thumbnail.standard.url : undefined;
      i.maxresThumbnail = thumbnail.maxres ? thumbnail.maxres.url : undefined;
    }
    return i;
  });
  return { list: list, total: res.pageInfo.totalResults, limit: res.pageInfo.resultsPerPage, nextPageToken: res.nextPageToken };
}
exports.fromYoutubePlaylist = fromYoutubePlaylist;
function fromYoutubeVideos(res) {
  var list = res.items.map(function (item) {
    var snippet = item.snippet;
    var content = item.contentDetails;
    if (snippet) {
      var thumbnail = snippet.thumbnails;
      var i = {
        id: item.id,
        title: snippet.title,
        publishedAt: new Date(snippet.publishedAt),
        description: snippet.description,
        localizedTitle: snippet.localized ? snippet.localized.title : '',
        localizedDescription: snippet.localized ? snippet.localized.description : '',
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
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
        projection: content.projection === 'rectangular' ? undefined : '3'
      };
      if (thumbnail) {
        i.thumbnail = thumbnail.default ? thumbnail.default.url : undefined;
        i.mediumThumbnail = thumbnail.medium ? thumbnail.medium.url : undefined;
        i.highThumbnail = thumbnail.high ? thumbnail.high.url : undefined;
        i.standardThumbnail = thumbnail.standard ? thumbnail.standard.url : undefined;
        i.maxresThumbnail = thumbnail.maxres ? thumbnail.maxres.url : undefined;
      }
      if (content.regionRestriction) {
        i.allowedRegions = content.regionRestriction.allow;
        i.blockedRegions = content.regionRestriction.blocked;
      }
      return i;
    }
    else {
      var now = new Date();
      var i = {
        id: item.id,
        publishedAt: now,
        duration: calculateDuration(content.duration),
        dimension: content.dimension,
        definition: content.definition === 'hd' ? 5 : undefined,
        caption: content.caption === 'true' ? true : undefined,
        licensedContent: content.licensedContent,
        projection: content.projection === 'rectangular' ? undefined : '3'
      };
      if (content.regionRestriction) {
        i.allowedRegions = content.regionRestriction.allow;
        i.blockedRegions = content.regionRestriction.blocked;
      }
      return i;
    }
  });
  return { list: list, total: res.pageInfo.totalResults, limit: res.pageInfo.resultsPerPage, nextPageToken: res.nextPageToken };
}
exports.fromYoutubeVideos = fromYoutubeVideos;
function getSubcriptions(request, key, channelId, mine, max, nextPageToken) {
  var maxResults = (max && max > 0 ? max : 4);
  var pageToken = (nextPageToken ? "&pageToken=" + nextPageToken : '');
  var mineStr = (mine ? "&mine=" + mine : '');
  var channel = (channelId && channelId.length > 0) ? "&channelId=" + channelId : '';
  var url = "https://youtube.googleapis.com/youtube/v3/subscriptions?key=" + key + mineStr + channel + "&maxResults=" + maxResults + pageToken + "&part=snippet";
  return request.get(url).then(function (res) {
    var r = {
      list: fromYoutubeChannels(res),
      nextPageToken: res.nextPageToken,
    };
    return r;
  });
}
exports.getSubcriptions = getSubcriptions;
