
import OrganizationModel from '../models/organization-mongo-model';
import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import { CreateOrganizationInputModel, CreateOrganizationOutputModel } from '../models/organization-model';

export class CreateOrganizationCommandHandlerHandler implements CqrsServiceBase {

    async handle(
        input: CreateOrganizationInputModel
    ): Promise<CreateOrganizationOutputModel> {
        try {
            let organization = new OrganizationModel(input);
            let newOrganization = await organization.save();

            let returnValue: CreateOrganizationOutputModel = {
                organization: newOrganization.toJSON()
            };
            return returnValue;
        } catch (error) {
            throw error;
        }
    }
}
