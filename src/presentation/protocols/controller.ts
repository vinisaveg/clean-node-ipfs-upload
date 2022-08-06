import { HttpResponse } from "./http";

export interface Controller<T, Y> {
  handle: (request: T) => Promise<HttpResponse<Y>>;
}
