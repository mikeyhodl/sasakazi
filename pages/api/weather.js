export default (req, res) => {
    const { location } = req.query;
    const myHeaders = new Headers();
    myHeaders.append("X-RapidAPI-Key", process.env.API_KEY);
    myHeaders.append("X-RapidAPI-Host", "weatherapi-com.p.rapidapi.com");
  
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(error.status || 500).json({ error: error.message });
      });
  };
  