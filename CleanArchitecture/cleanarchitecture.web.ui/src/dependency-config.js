import Contracts from './core/contracts';
import HttpService from './infrastructure/http-service';
import WeatherService from './core/weather/weather-service';

export default function (addSingleton, addTransient, inject) {
    // Singleton dependencies
    addSingleton(Contracts.Http, new HttpService());

    // Transient dependencies
    addTransient(Contracts.Weather, () => new WeatherService(inject(Contracts.Http)));
}