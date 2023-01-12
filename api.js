const myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", process.env.API_KEY);
myHeaders.append("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
const fetchWeather = (location) => {
  return fetch(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`,
    requestOptions
  ).then((response) => response.json());
};
export default fetchWeather;
