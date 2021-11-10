import HttpContract from "../core/contracts/http-contract";

export default class HttpService extends HttpContract {
    async get(path) {
        return await (await fetch(path)).json();
    }
}