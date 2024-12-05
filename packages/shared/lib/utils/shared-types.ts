export type ValueOf<T> = T[keyof T];

export const CONTENT_UI_VIEW_ROOT_ID = 'tldf-link-content-view-root';

export enum MessageType {
  LINK_SUMMARY = 'LINK_SUMMARY',
}

export interface BaseResponse {
  type: MessageType;
  payload: Record<string, unknown>;
}

export interface LinkSummaryResponse extends BaseResponse {
  type: MessageType.LINK_SUMMARY;
  payload: {
    url: string;
    status: 'loading' | 'success' | 'error';
    position: {
      x: number;
      y: number;
    };
    summary: string;
  };
}

export interface LinkSummaryRequest {
  url: string;
  position: {
    x: number;
    y: number;
  };
}
