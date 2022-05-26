"use strict";

// récupère les éléments HTML
let form = document.getElementById("form");
let ville = document.getElementById("ville");
let meteoj = document.getElementById("meteoj");
let meteoj1 = document.getElementById("meteoj1");
let meteoj2 = document.getElementById("meteoj2");
let meteoj3 = document.getElementById("meteoj3");
let meteoj4 = document.getElementById("meteoj4");
let meteoj5 = document.getElementById("meteoj5");

let listeDay = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

// fonction appel API
const apiCall = (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d1235f11f38a5d75a161a12b0081113e`
  )
    .then(responseOk, responseError)
    .then(recupMéteo)
    .catch(function (error) {
      console.log(error);
    });
};

// réponse si le fetch est ok
function responseOk(response) {
  //console.log(response.json());
  return response.json();
};
//réponse si erreur lors du fetch
function responseError(error) {
  console.log(error);
};

// fonction pour récupérer les données météo toutes les 3h
function recupMéteo(json) {
  for (let i = 0; i < json.list.length; i++) {
    // creer une div pour y mettre les éléments
    let div = document.createElement("div");
    // récupère l'heure du jour
    let p1 = document.createElement("p");
    p1.textContent = `${new Date(json.list[i].dt_txt).getHours()} h `;
    div.appendChild(p1);
    // récupère l'icône du temps
    let p2 = document.createElement("img");
    p2.setAttribute(
      "src",
      `http://openweathermap.org/img/w/${json.list[i].weather[0].icon}.png`
    );
    p2.setAttribute("alt", "icône méteo");
    div.appendChild(p2);
    // recupere la température actuelle dans un paragraphe
    let p3 = document.createElement("p");
    p3.textContent = Math.round(json.list[i].main.temp_max - 272, 15) + "°C";
    div.appendChild(p3);
    // récupère l'humidité
    let p5 = document.createElement("p");
    p5.textContent = `Humidité : ${json.list[i].main.humidity} %`;
    div.appendChild(p5);
    // récupère la pression
    let p6 = document.createElement("p");
    p6.textContent = `Pression : ${json.list[i].main.pressure} Pa`;
    div.appendChild(p6);

    //récupère le jour du mois dans le fichier json
    let dateMeteoJson = new Date(json.list[i].dt_txt).getDate();
    //récupère le jour du mois actuel
    let dateJour = new Date().getDate();
    // compare le jour du fichier avec le jour actuel pour placer la div selon le jour
    if (dateMeteoJson == dateJour) {
      if (!meteoj.hasChildNodes()) {
        let h2 = document.createElement("h2");
        h2.textContent = "Aujourd'hui";
        meteoj.appendChild(h2);
      };
      meteoj.appendChild(div);
    } else if (dateMeteoJson == dateJour + 1) {
      if (!meteoj1.hasChildNodes()) {
        let h2 = document.createElement("h2");
        h2.textContent = "Demain";
        meteoj1.appendChild(h2);
      };
      meteoj1.appendChild(div);
    } else if (dateMeteoJson == dateJour + 2) {
      if (!meteoj2.hasChildNodes()) {
        let h2 = document.createElement("h2");
        h2.textContent =
          listeDay[new Date(json.list[i].dt_txt).getDay()] +
          " " +
          new Date(json.list[i].dt_txt).getDate();
        meteoj2.appendChild(h2);
      };
      meteoj2.appendChild(div);
    } else if (dateMeteoJson == dateJour + 3) {
      if (!meteoj3.hasChildNodes()) {
        let h2 = document.createElement("h2");
        h2.textContent =
          listeDay[new Date(json.list[i].dt_txt).getDay()] +
          " " +
          new Date(json.list[i].dt_txt).getDate();
        meteoj3.appendChild(h2);
      };
      meteoj3.appendChild(div);
    } else if (dateMeteoJson == dateJour + 4) {
      if (!meteoj4.hasChildNodes()) {
        let h2 = document.createElement("h2");
        h2.textContent =
          listeDay[new Date(json.list[i].dt_txt).getDay()] +
          " " +
          new Date(json.list[i].dt_txt).getDate();
        meteoj4.appendChild(h2);
      };
      meteoj4.appendChild(div);
    } else {
      if (!meteoj5.hasChildNodes()) {
        let h2 = document.createElement("h2");
        h2.textContent =
          listeDay[new Date(json.list[i].dt_txt).getDay()] +
          " " +
          new Date(json.list[i].dt_txt).getDate();
        meteoj5.appendChild(h2);
      };
      meteoj5.appendChild(div);
    };
  };
};

//reset la section méteo et les contenus crées
function reset() {
  let allDiv = document.querySelectorAll("div");
  allDiv.forEach((element) => {
    element.textContent = "";
  });
}

// ecoute evenement submit sur le formulaire
form.addEventListener("submit", (event) => {
  event.preventDefault();
  reset();
  let city = event.target.ville.value;
  apiCall(city);
});
