import Abstract from '../../abstract-base';

export default class WeatherContract extends Abstract {
    static abstractMethods = [
        "get", // (): Array(WeatherForecasts)
    ]
}