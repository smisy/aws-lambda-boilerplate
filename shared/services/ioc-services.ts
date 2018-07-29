import { Provides } from 'typescript-ioc';

/**
 * To be used as an "interface", in case you want to be able to use different implementations.
 */
export abstract class CqrsServiceBase {
    abstract handle(input?: Object): Object;
}

/**
 * The implementation of the interface.
 */
@Provides(CqrsServiceBase)
export class CqrsServiceImpl implements CqrsServiceBase {
    handle(input?: Object): Object {
        return {};
    }
}
