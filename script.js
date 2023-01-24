const getDataFromNasa = () => {
  fetch(
    `https://api.nasa.gov/planetary/apod?api_key=lxxVWb664W1Z1XEmHEsChUzLGFriIQKYZdXU8sdk&start_date=2023-01-20`
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch(function (error) {
      console.log(error);
    });
};

getDataFromNasa()

