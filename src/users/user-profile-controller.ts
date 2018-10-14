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
  private getUserProfileHandler: GetUserProfileHandler;

  /**
   * @memberof UserProfileController
   */
  constructor() {
    this.getUserProfileHandler = new GetUserProfileHandler();
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
    const authorizer = event.requestContext.authorizer;

    const user: GetUserProfileInput = { id: authorizer.user.id };
    let userOutput: GetUserProfileOutput;
    await startMongoose();
    try {
      userOutput = await this.getUserProfileHandler.handle(event.requestContext, user);
      return ResponseBuilder.ok(userOutput.user);
    } catch (error) {
      return ResponseBuilder.unprocessableEntity(error.message);
    }
  }
}
