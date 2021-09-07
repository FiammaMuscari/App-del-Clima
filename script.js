let weather = { //https://home.openweathermap.org/api_keys
  "apiKey":"tu apikey aquí", //deberas generar tu propia apikey registrandote al sitio https://home.openweathermap.org/users/sign_in 
  //entrar a la pestaña ´API´ y en el sector ´current weather data´ tocamos el boton ´api doc´
  // haremos click en {API key} y copiaremos el código alfanumerico para reemplazar lo que tenemos en comillas

  fetchWeather: function(city){
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey + "&lang=es" //el lang es para que este en español, si borramos las ultimas comillas tendremos el idioma ingle scomo predeterminado
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
    document.querySelector(".temp").innerText = temp + "°C"; //temperatura
    document.querySelector(".humidity").innerText =
      "Humedad: " + humidity + "%"; //humedad
    document.querySelector(".wind").innerText =
      "Viento: " + speed + " m/s"; //velocidad viento metros x segundo
   
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

//para que el clima inicial sea el indicado en la api segun la ciudad de inicio de neustro html
weather.fetchWeather("Tokyo");


