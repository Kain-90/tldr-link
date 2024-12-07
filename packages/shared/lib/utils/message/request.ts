import type { MessageType } from '../shared-types';

export interface BaseRequest {
  kind: MessageType;
  payload: Record<string, unknown>;
}

export type UnionRequest = LinkSummaryRequest | SummaryClosedRequest;

export interface SummaryClosedRequest extends BaseRequest {
  kind: MessageType.SUMMARY_CLOSED;
  payload: {
    url: string;
  };
}

export interface LinkSummaryRequest extends BaseRequest {
  kind: MessageType.LINK_SUMMARY;
  payload: {
    url: string;
    position: {
      x: number;
      y: number;
    };
  };
}
