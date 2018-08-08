import { GetUserProfileHandler } from './services/get-user-profile-handler';
import { Inject } from 'typescript-ioc';
import { GetUserProfileInput, GetUserProfileOutput } from './models/user-model';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { startMongoose } from '../../shared/mongoose/mongoose';
import { ResponseBuilder } from '../../shared/response-builder';

export default class UserProfileController {
  @Inject private getUsetProfileHandler: GetUserProfileHandler;

  /**
   * @memberof UserProfileController
   */
  constructor(
    // tslint:disable-next-line:no-empty
  ) {
  }

  /**
   * Get User Profile
   *
   *
   * @returns {UserProfileDataModel}
   * @memberof UserProfileController
   */
  public get: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context): Promise<APIGatewayProxyResult> => {
    console.log('context:', context);
    console.log('event:', event);
    const id = event.requestContext.authorizer.principalId;

    const user: GetUserProfileInput = { id };
    let userOutput: GetUserProfileOutput;
    await startMongoose();
    try {
      console.log('UserProfileController.getProfile:', user);
      userOutput = await this.getUsetProfileHandler.handle(user);
      console.log('userOutput:', userOutput);
      return ResponseBuilder.ok(userOutput.user);
    } catch (error) {
      console.log('Register User Error:', error);
      return ResponseBuilder.unprocessableEntity(error.message);
    }
  }
}
