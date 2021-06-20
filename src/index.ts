import {ListDetail, ListItem, ListResult, Playlist, PlaylistSnippet, PlaylistVideo, PlaylistVideoSnippet, Video, VideoItemDetail, VideoSnippet, YoutubeVideoDetail} from './models';

export * from './models';

export interface VideoService {
  getPlaylists(channelId: string, max?: number): Promise<Playlist[]>;
  getPlaylist(playlistId: string, max?: number): Promise<PlaylistVideo[]>;
  getVideos(ids: string[], noSnippet?: boolean): Promise<Video[]>;
  getVideo(id: string, noSnippet?: boolean): Promise<Video>;
}

export interface Headers {
  [key: string]: any;
}
export interface HttpRequest {
  get<T>(url: string, options?: {headers?: Headers}): Promise<T>;
}
export class YoutubeClient implements VideoService {
  constructor(private key: string, private httpRequest: HttpRequest) {
    this.getPlaylists = this.getPlaylists.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.getVideos = this.getVideos.bind(this);
    this.getVideo = this.getVideo.bind(this);
  }
  getPlaylists(channelId: string, max?: number): Promise<Playlist[]> {
    const maxResults = (max && max > 0 ? max : 1000);
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?key=${this.key}&channelId=${channelId}&maxResults=${maxResults}&part=snippet,contentDetails`;
    return this.httpRequest.get<ListResult<ListItem<PlaylistSnippet, ListDetail>>>(url).then(res => fromYoutubePlaylists(res));
  }
  getPlaylist(playlistId: string, max?: number): Promise<PlaylistVideo[]> {
    const maxResults = (max && max > 0 ? max : 1000);
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${this.key}&playlistId=${playlistId}&maxResults=${maxResults}&part=snippet,contentDetails`;
    return this.httpRequest.get<ListResult<ListItem<PlaylistVideoSnippet, VideoItemDetail>>>(url).then(res => fromYoutubePlaylist(res));
  }
  getVideos(ids: string[], noSnippet?: boolean): Promise<Video[]> {
    if (!ids || ids.length === 0) {
      return Promise.resolve([]);
    }
    const strSnippet = (noSnippet ? '' : 'snippet,');
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${this.key}&part=${strSnippet}contentDetails&id=${ids.join(',')}`;
    return this.httpRequest.get<ListResult<ListItem<VideoSnippet, YoutubeVideoDetail>>>(url).then(res => fromYoutubeVideos(res));
  }
  getVideo(id: string, noSnippet?: boolean): Promise<Video> {
    return this.getVideos([id], noSnippet).then(res => res.length > 0 ? res[0] : null);
  }
}

export function fromYoutubePlaylists(res: ListResult<ListItem<PlaylistSnippet, ListDetail>>): Playlist[] {
  return res.items.map(item => {
    const snippet = item.snippet;
    const thumbnails = snippet.thumbnails;
    const i: Playlist = {
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

export function fromYoutubePlaylist(res: ListResult<ListItem<PlaylistVideoSnippet, VideoItemDetail>>): PlaylistVideo[] {
  return res.items.map(item => {
    const snippet = item.snippet;
    const thumbnails = snippet.thumbnails;
    const content = item.contentDetails;
    const i: PlaylistVideo = {
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
export function fromYoutubeVideos(res: ListResult<ListItem<VideoSnippet, YoutubeVideoDetail>>): Video[] {
  return res.items.map(item => {
    const snippet = item.snippet;
    const content = item.contentDetails;
    if (snippet) {
      const thumbnails = snippet.thumbnails;
      const i: Video = {
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
    } else {
      const i: Video = {
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

export function calculateDuration(d: string): number {
  if (!d) {
    return 0;
  }
  const k = d.split('M');
  if (k.length < 2) {
    return 0;
  }
  const a = k[1].substr(0, k[1].length - 1);
  const x = k[0].split('H');
  const b = (x.length === 1 ? k[0].substr(2) : x[1]);
  if (!isNaN(a as any) && !isNaN(b as any)) {
    const a1 = parseFloat(a);
    const a2 = parseFloat(b);
    if (x.length === 1) {
      return a2 * 60 + a1;
    } else {
      const c = x[0].substr(2);
      if (!isNaN(c as any)) {
        const a3 = parseFloat(c);
        return a3 * 3600 + a2 * 60 + a1;
      } else {
        return 0;
      }
    }
  }
  return 0;
}
