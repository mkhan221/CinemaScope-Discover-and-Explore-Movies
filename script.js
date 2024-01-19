const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Execute the function directly
returnMovies(APILINK);

async function returnMovies(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }

    const data = await res.json();

    console.log(data.results);

    // Clear existing content in the main section
    main.innerHTML = '';

    let currentRow;
    data.results.forEach((element, index) => {
      if (index % 4 === 0) {
        // Create a new row for every 4 movies
        currentRow = document.createElement('div');
        currentRow.setAttribute('class', 'row');
        main.appendChild(currentRow);
      }

      const divCard = createMovieCard(element);
      currentRow.appendChild(divCard);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


// ...

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = '';

  const searchItem = search.value.trim();

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});

function createMovieCard(movie) {
  const divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');

  const divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');

  const divColumn = document.createElement('div');
  divColumn.setAttribute('class', 'column');

  const image = document.createElement('img');
  image.setAttribute('class', 'thumbnail');
  image.setAttribute('src', IMG_PATH + movie.poster_path);
  image.setAttribute('alt', movie.title);

  const title = document.createElement('h3');
  title.textContent = movie.title;

  const center = document.createElement('center');

  center.appendChild(image);
  divCard.appendChild(center);
  divCard.appendChild(title);
  divColumn.appendChild(divCard);
  divRow.appendChild(divColumn);

  return divRow;
}
