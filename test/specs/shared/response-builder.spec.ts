import { ResponseBuilder } from '../../../shared/response-builder';
import { HttpStatusCode } from '../../../shared/http-status-codes';

describe('Response builder', () => {
  it(`should return status code ${HttpStatusCode.BadRequest} with Bad Request`, async () => {
    let response = ResponseBuilder.badRequest('Bad Request');
    response.statusCode.should.equal(HttpStatusCode.BadRequest);
  });

  it(`should return status code ${HttpStatusCode.Forbidden} with Forbidden Request`, async () => {
    let response = ResponseBuilder.forbidden('Forbidden Request');
    response.statusCode.should.equal(HttpStatusCode.Forbidden);
  });

  it(`should return status code ${HttpStatusCode.InternalServerError} with InternalServerError Request`, async () => {
    let response = ResponseBuilder.internalServerError('InternalServerError Request');
    response.statusCode.should.equal(HttpStatusCode.InternalServerError);
  });

  it(`should return status code ${HttpStatusCode.NotFound} with NotFound Request`, async () => {
    let response = ResponseBuilder.notFound('NotFound Request');
    response.statusCode.should.equal(HttpStatusCode.NotFound);
  });

  it(`should return status code ${HttpStatusCode.Ok} with Ok Request`, async () => {
    let response = ResponseBuilder.ok('Ok Request');
    response.statusCode.should.equal(HttpStatusCode.Ok);
  });

  it(`should return status code ${HttpStatusCode.Unauthorized} with Unauthorized Request`, async () => {
    let response = ResponseBuilder.unauthorized('Unauthorized Request');
    response.statusCode.should.equal(HttpStatusCode.Unauthorized);
  });

  it(`should return status code ${HttpStatusCode.UnprocessableEntity} with UnprocessableEntity Request`, async () => {
    let response = ResponseBuilder.unprocessableEntity('UnprocessableEntity Request');
    response.statusCode.should.equal(HttpStatusCode.UnprocessableEntity);
  });

});
