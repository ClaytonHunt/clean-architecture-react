import React, { useState, useEffect } from 'react';
import Contracts from '../core/contracts';
import { useInject } from '../dependencies';

export default function App() {
    let [forecasts, setForecasts] = useState([]);
    let [isLoading, setIsLoading] = useState(true);
    let [weather] = useInject([Contracts.Weather]);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            setForecasts(await weather.get());

            setIsLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>

            {
                isLoading ?
                    <p>
                        <em>
                            Loading... Please refresh once the ASP.NET backend has started. See
                            <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.
                        </em>
                    </p>
                    :
                    <table className='table table-striped' aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temp. (C)</th>
                                <th>Temp. (F)</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecasts.map(forecast =>
                                <tr key={forecast.date}>
                                    <td>{forecast.date}</td>
                                    <td>{forecast.temperatureC}</td>
                                    <td>{forecast.temperatureF}</td>
                                    <td>{forecast.summary}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            }
        </div>
    );
}
