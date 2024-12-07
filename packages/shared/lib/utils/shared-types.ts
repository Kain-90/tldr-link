export type ValueOf<T> = T[keyof T];

export const CONTENT_UI_VIEW_ROOT_ID = 'tldf-link-content-view-root';

export enum MessageType {
  LINK_SUMMARY = 'LINK_SUMMARY',
  SUMMARY_CLOSED = 'SUMMARY_CLOSED',
}
