import { CreateOrganizationCommandHandlerHandler } from './services/create-organization-command-handler';
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
import {
  CreateOrganizationUserInputModel
} from './models/organization-user-role-model';
import { CreateOrganizationUserCommandHandlerHandler } from './services/create-organization-user-role-command-handler';
import { ResponseBuilder } from '../../shared/response-builder';

export default class OrganizationController {
  private createOrganizationHandler: CreateOrganizationCommandHandlerHandler;
  private createOrganizationUserHandler: CreateOrganizationUserCommandHandlerHandler;

  /**
   * @memberof OrganizationController
   */
  constructor() {
    this.createOrganizationHandler = new CreateOrganizationCommandHandlerHandler();
    this.createOrganizationUserHandler = new CreateOrganizationUserCommandHandlerHandler();
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
        organizationData
      );
      const organizationUser: CreateOrganizationUserInputModel = {
        user: event.requestContext.authorizer.principalId,
        organization: organizationOutput.organization.id
      };
      await this.createOrganizationUserHandler.handle(
        organizationUser
      );
      return ResponseBuilder.ok({
        ...organizationOutput
      });
    } catch (error) {
      return ResponseBuilder.unprocessableEntity(error.message);
    }
  }
}
