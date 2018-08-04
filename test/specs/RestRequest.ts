import { ApiEvent, ApiContext } from '../../shared/api.interfaces';

export class ActionRequestOutput {
  constructor(public response: any, public error: any) {
  }
}

export interface RequestOptions {
  body?: any;
  token?: string;
}

export class RestRequest {
  protected async CallRestAPI(RestFunction: Function, options: RequestOptions): Promise<ActionRequestOutput> {
    return new Promise<ActionRequestOutput>((resolve, reject) => {
      const event: ApiEvent = {} as ApiEvent;
      let context: ApiContext;
      event.body = JSON.stringify(options.body);
      RestFunction(event, context, (error: any, response: any) => {
        resolve({response, error});
      });
    });
  }
}
