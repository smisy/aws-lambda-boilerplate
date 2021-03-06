import OrganizationController from './organization-controller';
import { APIGatewayProxyHandler } from 'aws-lambda';

const organizationController: OrganizationController = new OrganizationController();
export const create: APIGatewayProxyHandler = organizationController.create;
