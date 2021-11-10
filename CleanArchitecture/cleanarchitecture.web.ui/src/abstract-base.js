export default class AbstractClass {
    constructor() {
        if (new.target === AbstractClass || this.__proto__.__proto__.constructor === AbstractClass)
            throw new TypeError("Cannot construct " + this.constructor.name + " class instances directly");
        let exceptions = {};
        let currProto = this;
        while (currProto.constructor !== AbstractClass) {
            for (let method of (currProto.constructor.abstractMethods || [])) {
                if ("function" !== typeof (this[method]))
                    exceptions[method] = currProto.constructor.name;
            }
            currProto = currProto.__proto__;
        }
        if (0 !== Object.keys(exceptions).length) {
            let exceptionsArray = [];
            for (let method in exceptions) {
                exceptionsArray.push(exceptions[method] + "." + method);
            }
            exceptionsArray.sort();
            throw new TypeError("Must override the following methods: " + exceptionsArray.join(", "));
        }
    }
}