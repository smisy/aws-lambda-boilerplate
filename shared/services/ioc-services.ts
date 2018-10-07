import { Context } from 'aws-lambda';

/**
 * To be used as an "interface", in case you want to be able to use different implementations.
 */
export abstract class CqrsServiceBase {
    abstract handle(context: Context, input: Object ): Object;
}

/**
 * The implementation of the interface.
 */
export class CqrsServiceImpl implements CqrsServiceBase {
    handle(context: Context, input: Object): Object {
        return {};
    }
}
