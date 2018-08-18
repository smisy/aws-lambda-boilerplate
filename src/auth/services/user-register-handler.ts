import { CqrsServiceBase } from '../../../shared/services/ioc-services';
import UserModel from '../../users/models/user-mongo-model';
import { RegisterInputModel, RegisterOutputModel } from '../models/auth-model';

export class UserRegisterHandler implements CqrsServiceBase {

    async handle(
        input: RegisterInputModel
    ): Promise<RegisterOutputModel> {
        try {
            // Init user and add missing fields
            let user = new UserModel(input);
            user.provider = 'local';
            user.displayName = user.name;
            let newUser = await user.save();
            newUser.password = undefined;
            newUser.salt = undefined;

            let returnValue: RegisterOutputModel = {
                user: newUser.toJSON()
            };
            return returnValue;
        } catch (error) {
            throw error;
        }
    }
}
