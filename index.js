const form = document.querySelector(".search-section form");
const input = document.querySelector(".search-section input");
const msg = document.querySelector(".search-section .msg");
const list = document.querySelector(".results-section .cities");
const apiKey = "10b976bf00a54284bc4110627230604";
let citiesArray = [];

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value
  //request section
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${inputVal}&aqi=yes`;
  async function fetchData() {
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Please search for a valid city')
      }
      const data = await response.json();
      //check same request
      let index = citiesArray.findIndex(el => el.name.toLowerCase() === input.value.toLowerCase())
      if (index !== -1) {
        throw new Error('You already searched this sity')
      } else {
        msg.innerHTML = ''
      }
      //add new data
      const newCity = {
        name: data.location.name,
        temp_c: data.current.temp_c,
        feelslike_c: data.current.feelslike_c,
        condition: data.current.condition,
      }
      citiesArray.push(newCity)
      let markup = citiesArray.map(el => {
        return `
      <li class = 'city'>
      <figure>
      <img class="city-icon" src="${el.condition.icon}" alt="${el.condition.text}">
      <figcaption class="city-temp"> ${el.temp_c} <sup>°</sup></figcaption>
      </figure>
      <h2 class="city-name" data-name="${el.name}">
        ${el.name}
      </h2>
        <span class="city-condition">
        ${el.condition.text} 
        </span>
      </li>`
      }
      ).join('');
      list.innerHTML = markup;

    } catch (error) {
      msg.innerHTML = error.message
    }
  }
  fetchData()
});


