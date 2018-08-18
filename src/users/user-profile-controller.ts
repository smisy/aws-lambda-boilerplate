import { GetUserProfileHandler } from './services/get-user-profile-handler';
import { GetUserProfileInput, GetUserProfileOutput } from './models/user-model';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda';
import { startMongoose } from '../../shared/mongoose/mongoose';
import { ResponseBuilder } from '../../shared/response-builder';

export default class UserProfileController {
  private getUsetProfileHandler: GetUserProfileHandler;

  /**
   * @memberof UserProfileController
   */
  constructor() {
    this.getUsetProfileHandler = new GetUserProfileHandler();
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
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const id = event.requestContext.authorizer.principalId;

    const user: GetUserProfileInput = { id };
    let userOutput: GetUserProfileOutput;
    await startMongoose();
    try {
      userOutput = await this.getUsetProfileHandler.handle(user);
      return ResponseBuilder.ok(userOutput.user);
    } catch (error) {
      return ResponseBuilder.unprocessableEntity(error.message);
    }
  }
}
