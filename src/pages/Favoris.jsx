import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem('acnh_favorites');
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    const removeFavorite = (id) => {

        const newFavorites = favorites.filter(v => (v.id || v.name) !== id);
        setFavorites(newFavorites);
        localStorage.setItem('acnh_favorites', JSON.stringify(newFavorites));
    };


    const filteredFavorites = favorites.filter(villager =>
        villager.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-container">
            <h1 className="home-title">My Favorites</h1>

            {favorites.length > 0 && (
                <input
                    type="text"
                    placeholder="Search in favorites..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            )}

            {favorites.length === 0 ? (
                <div className="favorites-empty">
                    <h2>No favorites for the moment...</h2>
                    <p>Go to the villagers page to add some !</p>
                </div>
            ) : (

                <div className="villagers-grid">
                    {filteredFavorites.map((villager) => (
                        <div key={villager.id || villager.name} className="favorite-item">
                            <Link to={`/villager/${villager.name}`} className="villager-card">
                                <img src={villager.image_url} alt={villager.name} className="villager-img" />
                                <p className="villager-name">{villager.name}</p>
                            </Link>

                            <button
                                onClick={() => removeFavorite(villager.id || villager.name)}
                                className="remove-btn-small"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;