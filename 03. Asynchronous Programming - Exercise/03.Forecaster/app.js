function attachEvents() {
    const locationInput = document.getElementById('location');
    const submitButton = document.getElementById('submit');

    const forecastDivElement = document.getElementById('forecast');
    const currentDivElement = document.getElementById('current');
    const upcomingDivElement = document.getElementById('upcoming');

    const url = `http://localhost:3030/jsonstore/forecaster/locations`;

    submitButton.addEventListener('click', onSubmitBtnClicked);

    async function onSubmitBtnClicked() {
        try {
            let currentCondition = await fetch(url).then(response => response.json()).then(data => findSearchedCity(data)).catch(() => forecastDivElement.innerHTML = 'Error');

            let forecastUrl = `http://localhost:3030/jsonstore/forecaster/today/${currentCondition.code}`;

            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => createCurrentWeather(data))
                .catch(() => forecastDivElement.innerHTML = 'Error');

            upcommingForecastUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${currentCondition.code}`;

            fetch(upcommingForecastUrl)
                .then(respone => respone.json())
                .then(data => createThreeDayForecast(data))
                .catch(() => forecastDivElement.innerHTML = 'Error');
        } catch(error) {
            forecastDivElement.style.display = 'block';
            forecastDivElement.innerHTML = 'Error'
        }
    }

    function findSearchedCity(data) {
        let searchedData = {};

       data.forEach(city => {
           if (city.name === locationInput.value) {
               searchedData = city;
           }
       });

       return searchedData;
    }

    function createCurrentWeather(data) {
        let symbol = '';

        if (data.forecast.condition === 'Sunny') {
            symbol = '&#x2600;';
        } else if (data.forecast.condition === 'Partly sunny') {
            symbol = '&#x26C5;';
        } else if (data.forecast.condition === 'Overcast') {
            symbol = '&#x2601;';
        } else if (data.forecast.condition === 'Rain') {
            symbol = '&#x2614;';
        } else if (data.forecast.condition === 'Degrees') {
            symbol = '&#176;';
        }

        let divForecasts = document.createElement('div');
        divForecasts.classList.add('forecasts');

        let spanSymbol = document.createElement('span');
        spanSymbol.classList.add('condition');
        spanSymbol.classList.add('symbol');
        spanSymbol.innerHTML = symbol;

        let spanCondition = document.createElement('span');
        spanCondition.classList.add('condition');

        let spanCityName = document.createElement('span');
        spanCityName.classList.add('forecast-data');
        spanCityName.innerHTML = data.name;
        
        let spanCityDegrees = document.createElement('span');
        spanCityDegrees.classList.add('forecast-data');
        spanCityDegrees.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;

        let spanCityCondition = document.createElement('span');
        spanCityCondition.classList.add('forecast-data');
        spanCityCondition.innerHTML = data.forecast.condition;

        spanCondition.appendChild(spanCityName);
        spanCondition.appendChild(spanCityDegrees);
        spanCondition.appendChild(spanCityCondition);

        divForecasts.appendChild(spanSymbol);
        divForecasts.appendChild(spanCondition);

        currentDivElement.appendChild(divForecasts);
        forecastDivElement.style.display = 'block';
    }

    function createThreeDayForecast(data) {
        let div = document.createElement('div');
        div.classList.add('forecast-info');

        data.forecast.forEach(condition => {
            let symbol = '';

            if (condition.condition === 'Sunny') {
                symbol = '&#x2600;';
            } else if (condition.condition === 'Partly sunny') {
                symbol = '&#x26C5;';
            } else if (condition.condition === 'Overcast') {
                symbol = '&#x2601;';
            } else if (condition.condition === 'Rain') {
                symbol = '&#x2614;';
            } else if (condition.condition === 'Degrees') {
                symbol = '&#176;';
            }

            let span = document.createElement('span');
            span.classList.add('upcoming');

            let degrees = document.createElement('span');
            degrees.classList.add('symbol');
            degrees.innerHTML = symbol;

            let weatherDegrees = document.createElement('span');
            weatherDegrees.classList.add('forecast-data');
            weatherDegrees.innerHTML = `${condition.low}&#176;/${condition.high}&#176;`;

            let weather = document.createElement('span');
            weather.classList.add('forecast-data');
            weather.innerHTML = condition.condition;

            span.appendChild(degrees);
            span.appendChild(weatherDegrees);
            span.appendChild(weather);

            div.appendChild(span);
        });

        upcomingDivElement.appendChild(div);
        forecastDivElement.style.display = 'block';
    }
}

attachEvents();