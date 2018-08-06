import { HttpStatusCode } from './http-status-codes';

export abstract class RequestResult {
  abstract toResponseFormat(): Object;
}
interface ErrorRestResponse {
  error: {
    code: number,
    message: string;
    error?: Object[];
  };
}
export class SuccessResult<T> extends RequestResult {
  constructor(private object: T) {
    super();
    this.object = object;
  }
  toResponseFormat() {
    return this.object;
  }
}
export abstract class ErrorResult extends RequestResult {
  private result: ErrorRestResponse;

  constructor(public code: HttpStatusCode, public message: string) {
    super();
    this.result = {
      error: {
        code: 500,
        message: ''
      }
    };
    this.result.error.code = code;
    this.result.error.message = message;
  }

  toResponseFormat(): ErrorRestResponse {
    return this.result;
  }

}

export class BadRequestResult extends ErrorResult {
  constructor(message: string) {
    super(HttpStatusCode.BadRequest, message);
  }
}

export class UnprocessableEntityResult extends ErrorResult {
  constructor(message: string) {
    super(HttpStatusCode.UnprocessableEntity, message);
  }
}

export class UnauthorizedResult extends ErrorResult {
  constructor(message: string) {
    super(HttpStatusCode.Unauthorized, message);
  }
}

export class ForbiddenResult extends ErrorResult {
  constructor(message: string) {
    super(HttpStatusCode.Forbidden, message);
  }
}

export class InternalServerErrorResult extends ErrorResult {
  constructor(message: string) {
    super(HttpStatusCode.InternalServerError, message);
  }
}

export class NotFoundResult extends ErrorResult {
  constructor(message: string) {
    super(HttpStatusCode.NotFound, message);
  }
}
