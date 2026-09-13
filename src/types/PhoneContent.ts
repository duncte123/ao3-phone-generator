export interface PhoneContent {
  recipient: string;
  isGroup: boolean;
  chatName: string;
  messages: Array<Message>;
}

export type Message = TextMessage | TimeMessage | ImageMessage;

export interface TimeMessage extends Message {
  type: 'time';
  day: string;
  time: string;
}

export interface ImageMessage {
  type: 'img';
  url: string;
  desc: string;
}

export interface TextMessage {
  type: 'message';
  name: string;
  text: string;
}

