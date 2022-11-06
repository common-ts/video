"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeCache(cache, max) {
  var keys = Object.keys(cache);
  if (keys.length <= max) {
    return 0;
  }
  var lastKey = '';
  var count = 0;
  while (true) {
    var last = new Date();
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
      var key = keys_1[_i];
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
var nothumbnail = 'https://i.ytimg.com/img/no_thumbnail.jpg';
function formatBigThumbnail(t) {
  if (!t) {
    return t;
  }
  for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
    var obj = t_1[_i];
    if (!obj.thumbnail) {
      obj.thumbnail = nothumbnail;
    }
    if (!obj.mediumThumbnail) {
      obj.mediumThumbnail = nothumbnail;
    }
    if (!obj.highThumbnail) {
      obj.highThumbnail = nothumbnail;
    }
    if (!obj.standardThumbnail) {
      obj.standardThumbnail = nothumbnail;
    }
    if (!obj.maxresThumbnail) {
      obj.maxresThumbnail = nothumbnail;
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
function fromYoutubeSearch(res) {
  var list = res.items.filter(function (i) { return i.snippet; }).map(function (item) {
    var snippet = item.snippet;
    var thumbnail = snippet.thumbnails;
    var i = {
      id: '',
      title: snippet.title ? snippet.title : '',
      description: snippet.description ? snippet.description : '',
      publishedAt: new Date(snippet.publishedAt),
      channelId: snippet.channelId ? snippet.channelId : '',
      channelTitle: snippet.channelTitle ? snippet.channelTitle : '',
      liveBroadcastContent: snippet.liveBroadcastContent,
      publishTime: new Date(snippet.publishTime),
    };
    if (thumbnail) {
      i.thumbnail = thumbnail.default ? thumbnail.default.url : undefined;
      i.mediumThumbnail = thumbnail.medium ? thumbnail.medium.url : undefined;
      i.highThumbnail = thumbnail.high ? thumbnail.high.url : undefined;
    }
    var id = item.id;
    if (id) {
      if (id.videoId) {
        i.id = id.videoId;
        i.kind = 'video';
      }
      else if (id.channelId) {
        i.id = id.channelId;
        i.kind = 'channel';
      }
      else if (id.playlistId) {
        i.id = id.playlistId;
        i.kind = 'playlist';
      }
    }
    return i;
  });
  return { list: list, total: res.pageInfo.totalResults, limit: res.pageInfo.resultsPerPage, nextPageToken: res.nextPageToken };
}
exports.fromYoutubeSearch = fromYoutubeSearch;
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
