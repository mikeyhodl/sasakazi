const form = document.querySelector("form");
const weatherDiv = document.getElementById("weather");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.getElementById("location").value;

  const myHeaders = new Headers();
  myHeaders.append(
    "X-RapidAPI-Key",
    "140fd8c839msh4ed48ab14336015p1ac1e8jsn6db1d0261a19"
  );
  myHeaders.append("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      weatherDiv.innerHTML = `
                  <h2>Weather in ${result.location.name}, ${result.location.country} </h2>
                  <p><strong>Current Time:</strong> ${result.location.localtime}</p>
                  <p><strong>Temperature:</strong> ${result.current.temp_c}&#176;C</p>
                  <p><strong>Weather:</strong> ${result.current.condition.text}</p>
                  <img src="${result.current.condition.icon}" />
                  <p><strong>Wind speed:</strong> ${result.current.wind_kph} Km/h</p>
                  <p><strong>Humidity:</strong> ${result.current.humidity}&#37;</p>
                  <p><strong>Last Updated:</strong> ${result.current.last_updated}</p>

                `;
    })
    .catch((error) => console.log("error", error));
});
