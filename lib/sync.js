"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
