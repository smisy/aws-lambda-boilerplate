import UserProfileController from './user-profile-controller';
import { APIGatewayProxyHandler } from 'aws-lambda';

const userProfileController: UserProfileController = new UserProfileController();
export const getProfile: APIGatewayProxyHandler = userProfileController.get;
