import "./App.css";
import Tmdb from "./Tmdb";
import { useState, useEffect } from "react";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  useEffect(() => {
    const loadPage = async () => {
      const movies = await Tmdb.getMoviesContent();
      setMovieList(movies);
      let featuredMovie = movies.filter((i) => i.slug === "originais");
      let randomChosen = Math.floor(
        Math.random() * featuredMovie[0].items.results.length - 1
      );

      let chosen = featuredMovie[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      console.log(chosen);
      setFeaturedData(chosenInfo);
    };
    loadPage();
  }, []);

  return (
    <div className="main--page">
      <Header black={blackHeader} />
      <div className="featuredMovie">
        {featuredData && <FeaturedMovie item={featuredData} />}
      </div>
      <div className="searchMovies">
        {movieList.map((item, key) => {
          return <MovieRow items={item.items} title={item.title} key={key} />;
        })}
      </div>
      <footer>
        Feito por André Medeiros para aprimorar meus conhecimentos em REACT.
        <br />
        Direitos de imagem para Netflix!
        <br />
        API usada Themoviedb.org
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="loading"
          ></img>
        </div>
      )}
    </div>
  );
}

export default App;
