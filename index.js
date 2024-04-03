const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const content = document.querySelector(".content");

button.addEventListener("click", () => {
  if (!input.value) return;   // Verifica se possui alguma informação no input, se não ele vai para o return ou para a função getDataApi

  getDataApi();
});

async function getDataApi() { // Função assicrona 
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI( // Link da Api
    input.value // Valida as cidades
  )}&units=metric&appid=91cf6ff1d03e31336c70f8e4ba9b7594`; // Units metric trás informações mais contraidas // Meu ID da API

  try {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          return alert("Local não encontrado!"); // Se retornar o primeiro erro será 404 
        }

        loadData(data); // Chama a função criado logo abaixo na parte de estilo
      });
  } catch (error) {
    alert(error); // Se não for exibido o primeiro erro 404, será exibido esse alert
  }
}

function loadData(data) {
  place.innerHTML = `${data.name}, ${data.sys.country}`;
  degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
  content.style.display = "flex";
}
