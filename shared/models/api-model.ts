import * as _ from 'lodash';

export class ApiModel {
    constructor(json: Object) {
        _.merge(this, json);
    }
}

export default ApiModel;
