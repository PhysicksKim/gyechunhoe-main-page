export type ContentType =
  | 'sundayvirtual'
  | 'jjak'
  | 'vcastle'
  | 'vsummit'
  | 'witchtalk'
  | 'churak'
  | 'vrumarble';

export interface Content {
  type: ContentType;
  name: string;
  poster: string;
  images: string[];
}
