import React, { useEffect, useState } from 'react';
import './App.css';
import TheMovieDB from './TheMovieDB';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  let list;

  useEffect(() => {
    const loadAll = async () => {

      //pegando toda lista de filmes
      list = await TheMovieDB.getHomeList();
      setMovieList(list);

      //pegando filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * originals[0].items.results.length - 1);
      let chosenMovie = originals[0].items.results[randomChosen];
      let chosenInfo = await TheMovieDB.getMovieInfo(chosenMovie.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.addEventListener('scroll', scrollListener);
    }
  }, [])

  const updateFeatured = async (id) => {
    let chosenMovie =  await TheMovieDB.getMovieInfo(id, 'tv');
    setFeaturedData(chosenMovie)
  }

  return (
    <div className="page">

      <Header black={blackHeader} />

      {
        featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} update={updateFeatured} />
          </div>
        ))}
      </section>

      <footer>
        Direitos de imagem para Netflix<br />
        Dados pegos do site themoviedb.org
      </footer>

      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div>
      }

    </div>
  )
}