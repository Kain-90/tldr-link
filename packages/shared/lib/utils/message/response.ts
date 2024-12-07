import type { MessageType } from '../shared-types';

export interface BaseResponse {
  kind: MessageType;
  payload: Record<string, unknown>;
}

export interface LinkSummaryResponse extends BaseResponse {
  kind: MessageType.LINK_SUMMARY;
  payload: {
    url: string;
    status: 'loading' | 'streaming' | 'success' | 'error';
    position: {
      x: number;
      y: number;
    };
    summary: string;
  };
}
