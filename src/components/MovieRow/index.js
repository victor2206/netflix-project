import React, { useState } from 'react';
import './MovieRow.css';

export default ({ title, items, update }) => {

    const [scrollX, setScrollX] = useState(0)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            setScrollX(x)
            setTimeout(() => {
                x = 0
                setScrollX(x)
            }, 200)
            return
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 150;
        if ((window.innerWidth - listWidth) > x) {
            setScrollX(x)
            setTimeout(() => {
                x = (window.innerWidth - listWidth) - 60;
                setScrollX(x)
            }, 200)
            return
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow-left" onClick={handleLeftArrow}>
                &#706;
            </div>
            <div className="movieRow-right" onClick={handleRightArrow}>
                &#707;
            </div>
            <div className="movieRow--listArea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item" onClick={() => update(item.id)}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}