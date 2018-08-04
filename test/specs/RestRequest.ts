import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';

export interface RequestOptions {
  body?: any;
  token?: string;
}

export class RestRequest {
  protected async CallRestAPI(RestFunction: Function, options: RequestOptions): Promise<APIGatewayProxyResult> {
      const event: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;
      let context: Context;
      event.body = JSON.stringify(options.body);
      let returnValue = await RestFunction(event, context);
      return returnValue;
  }
}
