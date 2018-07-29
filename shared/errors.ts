import { HttpStatusCode } from './http-status-codes';

export abstract class RequestResult {
  abstract toResponseFormat(): any;

}

export class SuccessResult extends RequestResult {
  constructor(private object: any) {
    super();
    this.object = object;
  }
  toResponseFormat() {
    return this.object;
  }
}
export abstract class ErrorResult extends RequestResult {
  errors?: any[];

  constructor(public code: HttpStatusCode, public message: string) {
    super();
    this.code = code;
    this.message = message;
  }

  toResponseFormat() {
    return {
      error: {
        code: this.code,
        message: this.message,
        errors: this.errors
      }
    };
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
