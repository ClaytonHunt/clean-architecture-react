import Abstract from '../../abstract-base';

export default class HttpContract extends Abstract {
    static abstractMethods = [
        "get", // (path:string): object
    ]
}