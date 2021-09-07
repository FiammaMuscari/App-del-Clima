let weather = { //https://home.openweathermap.org/api_keys
  "apiKey":"f9aa6cbc14fbedaf1645c36885807140",

  fetchWeather: function(city){
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey + "&lang=es"
    )
      .then((response) => response.json())
      .then((data) =>this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data; 
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Clima en " + name; //nombre ciudad
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"; // icono del clima
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humedad: " + humidity + "%"; //humedad
    document.querySelector(".wind").innerText =
      "Viento: " + speed + " m/s"; //velocidad viento
   
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + " city')";//cambio del fondo segun la ciudad
  },
  search: function (){
    this.fetchWeather(document.querySelector(".search-bar").value);
  }

};

//para la busqueda por boton

document
.querySelector(".search button")
.addEventListener("click", function(){
  weather.search();
});

//para que cambie el clima al dar enter con el teclado
document.querySelector(".search-bar").addEventListener("keyup", function(event){
  if (event.key == "Enter"){
    weather.search()
  }
})

//para que el clima inicial sea el indicado en la api segun la ciudad de inicio
weather.fetchWeather("Tokyo");


