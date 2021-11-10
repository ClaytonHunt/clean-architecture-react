import WeatherContract from "../contracts/weather-contract";

export default class WeatherService extends WeatherContract {
    constructor(httpService) {
        super();

        this.http = httpService;
    }

    async get() {
        return await this.http.get('weatherforecast');
    }
}