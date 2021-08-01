"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelModel = {
  name: 'channel',
  attributes: {
    id: {
      key: true,
      match: 'equal'
    },
    country: {},
    customUrl: {},
    publishedAt: {
      type: 'datetime'
    },
    title: {},
    description: {},
    localizedTitle: {},
    localizedDescription: {},
    thumbnail: {},
    mediumThumbnail: {},
    highThumbnail: {},
    uploads: {},
    favorites: {},
    likes: {},
    lastUpload: {
      type: 'datetime'
    },
    count: {
      type: 'integer'
    },
    itemCount: {
      type: 'integer'
    },
    playlistCount: {
      type: 'integer'
    },
    playlistItemCount: {
      type: 'integer'
    },
    playlistVideoCount: {
      type: 'integer'
    },
    playlistVideoItemCount: {
      type: 'integer'
    },
    channels: {
      type: 'primitives'
    }
  }
};
exports.channelSyncModel = {
  name: 'channelSync',
  attributes: {
    id: {
      key: true,
      match: 'equal'
    },
    syncTime: {
      type: 'datetime'
    },
    uploads: {}
  }
};
exports.playlistModel = {
  name: 'playlist',
  attributes: {
    id: {
      key: true,
      match: 'equal'
    },
    channelId: {
      match: 'equal'
    },
    channelTitle: {},
    publishedAt: {
      type: 'datetime'
    },
    title: {},
    description: {},
    localizedTitle: {},
    localizedDescription: {},
    thumbnail: {},
    mediumThumbnail: {},
    highThumbnail: {},
    standardThumbnail: {},
    maxresThumbnail: {},
    count: {
      type: 'integer'
    },
    itemCount: {
      type: 'integer'
    }
  }
};
exports.playlistVideoModel = {
  name: 'video',
  attributes: {
    id: {
      key: true,
      match: 'equal'
    },
    videos: {
      type: 'primitives'
    }
  }
};
exports.videoModel = {
  name: 'video',
  attributes: {
    id: {
      key: true,
      match: 'equal'
    },
    categoryId: {
      match: 'equal'
    },
    channelId: {
      match: 'equal'
    },
    channelTitle: {},
    publishedAt: {
      type: 'datetime'
    },
    title: {},
    description: {},
    localizedTitle: {},
    localizedDescription: {},
    thumbnail: {},
    mediumThumbnail: {},
    highThumbnail: {},
    standardThumbnail: {},
    maxresThumbnail: {},
    tags: {
      type: 'primitives'
    },
    rank: {
      type: 'integer'
    },
    caption: {},
    duration: {
      type: 'integer'
    },
    definition: {
      type: 'integer'
    },
    dimension: {},
    projection: {},
    defaultLanguage: {},
    defaultAudioLanguage: {},
    allowedRegions: {
      type: 'primitives'
    },
    blockedRegions: {
      type: 'primitives'
    },
    licensedContent: {
      type: 'boolean'
    },
    livebroadcastcontent: {}
  }
};
