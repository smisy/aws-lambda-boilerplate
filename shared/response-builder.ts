import { ApiCallback, ApiResponse } from './api.interfaces';
import {
  BadRequestResult,
  ForbiddenResult,
  InternalServerErrorResult,
  NotFoundResult,
  UnprocessableEntityResult,
  UnauthorizedResult,
  RequestResult,
  SuccessResult
} from './errors';
import { HttpStatusCode } from './http-status-codes';

export class ResponseBuilder {
  public static badRequest(description: string, callback: ApiCallback): void {
    const errorResult: BadRequestResult = new BadRequestResult(description);
    ResponseBuilder._returnAs<BadRequestResult>(errorResult, errorResult.code, callback);
  }

  public static forbidden(description: string, callback: ApiCallback): void {
    const errorResult: ForbiddenResult = new ForbiddenResult(description);
    ResponseBuilder._returnAs<ForbiddenResult>(errorResult, errorResult.code, callback);
  }

  public static unauthorized(description: string, callback: ApiCallback): void {
    const errorResult: UnauthorizedResult = new UnauthorizedResult(description);
    ResponseBuilder._returnAs<UnauthorizedResult>(errorResult, errorResult.code, callback);
  }

  public static unprocessableEntity(description: string, callback: ApiCallback): void {
    const errorResult: UnprocessableEntityResult = new UnprocessableEntityResult(description);
    ResponseBuilder._returnAs<UnprocessableEntityResult>(errorResult, errorResult.code, callback);
  }

  public static internalServerError(description: string, callback: ApiCallback): void {
    const errorResult: InternalServerErrorResult = new InternalServerErrorResult(description);
    ResponseBuilder._returnAs<InternalServerErrorResult>(errorResult, errorResult.code, callback);
  }

  public static notFound(description: string, callback: ApiCallback): void {
    const errorResult: NotFoundResult = new NotFoundResult(description);
    ResponseBuilder._returnAs<NotFoundResult>(errorResult, errorResult.code, callback);
  }

  public static ok<T>(result: T, callback: ApiCallback): void {
    ResponseBuilder._returnAs<T>(new SuccessResult(result), HttpStatusCode.Ok, callback);
  }

  private static _returnAs<T>(result: RequestResult, statusCode: HttpStatusCode, callback: ApiCallback): void {
    const response: ApiResponse = {
      body: result.toResponseFormat(),
      headers: {
        'Access-Control-Allow-Origin': '*'  // This is required to make CORS work with AWS API Gateway Proxy Integration.
      },
      statusCode
    };
    callback(undefined, response);
  }
}
