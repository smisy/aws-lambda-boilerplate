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
import { APIGatewayProxyResult } from '../node_modules/@types/aws-lambda';

export class ResponseBuilder {
  public static badRequestz(description: string): APIGatewayProxyResult {
    const errorResult: BadRequestResult = new BadRequestResult(description);
    return ResponseBuilder._returnAs(errorResult, errorResult.code);
  }

  public static forbidden(description: string): APIGatewayProxyResult {
    const errorResult: ForbiddenResult = new ForbiddenResult(description);
    return ResponseBuilder._returnAs(errorResult, errorResult.code);
  }

  public static unauthorized(description: string): APIGatewayProxyResult {
    const errorResult: UnauthorizedResult = new UnauthorizedResult(description);
    return ResponseBuilder._returnAs(errorResult, errorResult.code);
  }

  public static unprocessableEntity(description: string): APIGatewayProxyResult {
    const errorResult: UnprocessableEntityResult = new UnprocessableEntityResult(description);
    return ResponseBuilder._returnAs(errorResult, errorResult.code);
  }

  public static internalServerError(description: string): APIGatewayProxyResult {
    const errorResult: InternalServerErrorResult = new InternalServerErrorResult(description);
    return ResponseBuilder._returnAs(errorResult, errorResult.code);
  }

  public static notFound(description: string): APIGatewayProxyResult {
    const errorResult: NotFoundResult = new NotFoundResult(description);
    return ResponseBuilder._returnAs(errorResult, errorResult.code);
  }

  public static ok(result: Object): APIGatewayProxyResult {
    return ResponseBuilder._returnAs(new SuccessResult(result), HttpStatusCode.Ok);
  }

  private static _returnAs(result: RequestResult, statusCode: HttpStatusCode): APIGatewayProxyResult {
    const response: APIGatewayProxyResult = {
      body: result.toResponseFormat(),
      headers: {
        'Access-Control-Allow-Origin': '*'  // This is required to make CORS work with AWS API Gateway Proxy Integration.
      },
      statusCode
    };
    return response;
  }
}
