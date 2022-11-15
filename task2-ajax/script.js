"use strict";
const apiUrl = "https://api.tvmaze.com/search/shows?q=";
const form = document.querySelector("#search-form");
const button = form.querySelector("button");
const input = form.querySelector("input");
const results = document.querySelector("#results");

button.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const queryParam = input.value;
  if (queryParam.length > 1) {
    getTVSeriesData(queryParam);
  }

  // console.log("button is clicked", queryParam);
});

const rendeResults = (data) => {
  results.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const h3 = document.createElement("h3");
    h3.textContent = data[i].show.name;
    const img = document.createElement("img");
    img.src = data[i].show.image.medium;
    results.append(h3);
    results.append(img);
  }
};
const getTVSeriesData = async (name) => {
  try {
    const response = await fetch(apiUrl + name);
    const data = await response.json();
    console.log("results:", data);
    rendeResults(data);
  } catch (error) {
    console.log("Network failure", error);
  }
};

document.addEventListener("click", () => {
  console.log("mouse clicked somewhere in this page");
});
/*console.log("hellow world");

const figCaptionElem = document.querySelector("figcaption");
const imgElem = document.querySelector("img");

const getData = async () => {
  const response = await fetch("pics.json");
  const data = await response.json();
  figCaptionElem.innerText = data[0].description;
  imgElem.src = data[0].url;
};

getData();
console.log("This is last line of code");
*/
