interface Response {
  status: number;
  message: string;
}

/** API 기본 응답 형식 */
export interface BaseResponse<T> extends Response {
  result: T;
}
