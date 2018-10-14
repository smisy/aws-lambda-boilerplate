import { CreateOrganizationCommandHandler } from './services/create-organization-command-handler';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from 'aws-lambda';
import {
  CreateOrganizationOutputModel,
  CreateOrganizationInputModel
} from './models/organization-model';
import { startMongoose } from '../../shared/mongoose/mongoose';
import { CreateOrganizationUserInputModel } from '../users/models/organization-user-model';
import { CreateOrganizationUserCommandHandler } from '../users/services/create-organization-user-command-handler';
import { ResponseBuilder } from '../../shared/response-builder';

export default class OrganizationController {
  private createOrganizationHandler: CreateOrganizationCommandHandler;
  private createOrganizationUserHandler: CreateOrganizationUserCommandHandler;

  /**
   * @memberof OrganizationController
   */
  constructor() {
    this.createOrganizationHandler = new CreateOrganizationCommandHandler();
    this.createOrganizationUserHandler = new CreateOrganizationUserCommandHandler();
  }

  /**
   * Register a new user.
   *
   *
   * @returns {RegisterOutputModel}
   * @memberof OrganizationController
   */
  public create: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    const organizationData: CreateOrganizationInputModel = JSON.parse(
      event.body
    );
    let organizationOutput: CreateOrganizationOutputModel;
    await startMongoose();
    try {
      organizationOutput = await this.createOrganizationHandler.handle(
        event.requestContext,
        organizationData
      );
      const organizationUser: CreateOrganizationUserInputModel = {
        user: event.requestContext.authorizer.principalId,
        organization: organizationOutput.organization.id
      };
      await this.createOrganizationUserHandler.handle(
        event.requestContext,
        organizationUser
      );

      // update user model

      return ResponseBuilder.ok({
        ...organizationOutput
      });
    } catch (error) {
      return ResponseBuilder.unprocessableEntity(error.message);
    }
  }
}
