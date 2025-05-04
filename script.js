document.getElementById("countrySelect").addEventListener("change", function () {
    const country = this.value;
    const weatherBox = document.getElementById("weatherResult");

    const apiKey = "54e3a19fa172716a332658482f08e18e";  
    const cities = {
        us: "New York",
        uk: "London",
        fr: "Paris",
        in: "Delhi"
    };

    const city = cities[country];

    if (!city) {
        weatherBox.innerText = "No city configured for this country.";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                weatherBox.innerText = `Weather in ${city}: ${description}, ${temp}°C`;
            } else {
                weatherBox.innerText = "Failed to fetch weather data.";
            }
        })
        .catch(error => {
            weatherBox.innerText = "Error fetching data.";
            console.error(error);
        });
});