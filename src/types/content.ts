export type ContentType =
  | 'jjak'
  | 'vcastle'
  | 'vsummit'
  | 'witchtalk'
  | 'churak';

export interface Content {
  type: ContentType;
  name: string;
  poster: string;
  images: string[];
}
