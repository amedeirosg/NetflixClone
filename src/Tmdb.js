const API_KEY = "8b3e97558c6d8f58680d7708a93e066d";
const API_URL = "https://api.themoviedb.org/3";

//Realizando a busca dos meus filmes na minha API do TMDB
const basicFetch = async (endpoint) => {
  const fetchAPI = await fetch(`${API_URL}${endpoint}`);
  const json = await fetchAPI.json();
  return json;
};

export default {
  getMoviesContent: async () => {
    return [
      {
        slug: "originais",
        title: "Originais Netflix",
        items: await basicFetch(
          `/discover/tv?with_network=213&language=PT-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "recomendados",
        title: "Recomendados",
        items: await basicFetch(
          `/trending/all/week?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "Em alta",
        title: "Em alta",
        items: await basicFetch(
          `/movie/top_rated?language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "Ação",
        title: "Ação",
        items: await basicFetch(
          `/discover/movie?with_genre=28&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "Comédia",
        title: "Comédia",
        items: await basicFetch(
          `/discover/movie?with_genre=35&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "Romance",
        title: "Romance",
        items: await basicFetch(
          `/discover/movie?with_genre=10749&language=pt-BR&api_key=${API_KEY}`
        ),
      },
      {
        slug: "Terror",
        title: "Terror",
        items: await basicFetch(
          `/discover/movie?with_genre=27&language=pt-BR&api_key=${API_KEY}`
        ),
      },
    ];
  },

  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case "movie":
          info = await basicFetch(
            `/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;
        case "tv":
          info = await basicFetch(
            `/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`
          );
          break;

        default:
          info = null;
          break;
      }
    }

    return info;
  },
};
