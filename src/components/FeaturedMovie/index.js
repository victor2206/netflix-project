import React from 'react';
import './FeaturedMovie.css';

export default ({ item }) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    let size = 150
    if (description.length > size) {
        description = description.substring(0, size) + '...';
    }

    const showModal = () => {
        let bg = document.querySelector('.modal-background')
        bg.style.display = 'flex'
        let x = document.querySelector('.modal-content')

        let opacity = 0;
        let interval = setInterval(show, 50);
        function show() {
            opacity = Number(window.getComputedStyle(x)
                .getPropertyValue("opacity"));
            if (opacity < 1) {
                opacity = opacity + 0.1;
                x.style.opacity = opacity
            } else {
                clearInterval(interval);
            }
        }
    }

    const closeModal = () => {
        let bg = document.querySelector('.modal-background')
        bg.style.display = 'none'
        let x = document.querySelector('.modal-content')
        x.style.opacity = 0
    }

    return (
        <section className="featured" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">
                        {description}{description.length > size && <button className="modal-button" onClick={showModal}>ler mais...</button>}
                    </div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
            <div className="modal-background">
                <span className="modal-close-btn" onClick={closeModal}>&times;</span>
                <div className="modal-content">
                    <h2>{item.original_name}</h2>
                    {item.overview}
                </div>
            </div>
        </section>

    )
}