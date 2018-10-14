// import OrganizationUserModel from '../models/organization-user-mongo-model';
// import { CqrsServiceBase } from '../../../shared/services/ioc-services';
// import {
//   ORGANIZATION_ROLES,
//   AddOrganizationToUserProfileInputModel,
//   AddOrganizationToUserProfileOutputModel
// } from '../models/organization-user-model';
// import { Context, APIGatewayEventRequestContext } from 'aws-lambda';
// import { AuthUser } from '../../auth/models/auth-model';

// export class AddOrganizationToUserProfileCommandHandler
//   implements CqrsServiceBase {
//   async handle(
//     context: Context,
//     input: AddOrganizationToUserProfileInputModel
//   ): Promise<AddOrganizationToUserProfileOutputModel> {
//     try {
//       let user: AuthUser = context.request as APIGatewayEventRequestContext;
//       return returnValue;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
