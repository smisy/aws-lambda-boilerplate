import { APIGatewayProxyResult, APIGatewayProxyEvent, Context, APIGatewayProxyHandler } from 'aws-lambda';

export interface RequestOptions {
  body?: any;
  parameter?: { [name: string]: string; };
  token?: string;
}

export class ActionRequestOutput<T> {
  constructor(public response: APIGatewayProxyResult, public body: T) {
  }
}

export class RestRequest {
  protected async CallRestAPI<T>(RestFunction: APIGatewayProxyHandler, options: RequestOptions): Promise<ActionRequestOutput<T>> {
    const event: APIGatewayProxyEvent = {} as APIGatewayProxyEvent;
    let context: Context;
    event.body = options.body ? JSON.stringify(options.body) : undefined;
    event.pathParameters = options.parameter ? options.parameter : undefined;

    let response = await RestFunction(event, context, undefined) as APIGatewayProxyResult;
    const body = JSON.parse(response.body);
    return { response, body };
  }
}
