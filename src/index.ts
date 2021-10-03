import {CategorySnippet, ListItem, VideoCategory, YoutubeListResult} from './models';
import {HttpRequest} from './service';
export * from './metadata';
export * from './models';
export * from './comment';
export * from './service';
export * from './youtube';
export * from './sync';

export function getLimit(limit?: number, d?: number): number {
  if (limit) {
    return limit;
  }
  if (d && d > 0) {
    return d;
  }
  return 48;
}
export class CategoryClient {
  constructor(private key: string, private httpRequest: HttpRequest) {
    this.getCagetories = this.getCagetories.bind(this);
  }
  getCagetories(regionCode?: string): Promise<VideoCategory[]> {
    if (!regionCode) {
      regionCode = 'US';
    }
    const url = `https://www.googleapis.com/youtube/v3/videoCategories?key=${this.key}&regionCode=${regionCode}`;
    return this.httpRequest.get<YoutubeListResult<ListItem<string, CategorySnippet, any>>>(url).then(res => fromYoutubeCategories(res));
  }
}
export function fromYoutubeCategories(res: YoutubeListResult<ListItem<string, CategorySnippet, any>>): VideoCategory[] {
  if (!res || !res.items || res.items.length === 0) {
    return [];
  }
  return res.items.filter(i => i.snippet).map(item => {
    const snippet = item.snippet;
    const i: VideoCategory = {
      id: item.id,
      title: snippet.title,
      assignable: snippet.assignable,
      channelId: snippet.channelId
    };
    return i;
  });
}
