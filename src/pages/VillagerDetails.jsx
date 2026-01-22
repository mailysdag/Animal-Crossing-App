import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getVillagerByName } from '../services/api';
import '../App.css';

function VillagerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [villager, setVillager] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        getVillagerByName(id).then(data => {
            setVillager(data);
            checkIfFavorite(data);
        });
    }, [id]);

    const checkIfFavorite = (data) => {
        if (!data) return;
        const saved = localStorage.getItem('acnh_favorites');
        if (saved) {
            const list = JSON.parse(saved);
            const found = list.find(item => item.name === data.name);
            if (found) setIsFavorite(true);
        }
    };

    const toggleFavorite = () => {
        const saved = localStorage.getItem('acnh_favorites');
        let list = saved ? JSON.parse(saved) : [];

        if (isFavorite) {
            list = list.filter(item => item.name !== villager.name);
            setIsFavorite(false);
        } else {
            list.push(villager);
            setIsFavorite(true);
        }
        localStorage.setItem('acnh_favorites', JSON.stringify(list));
    };

    if (!villager) return <div className="loading">Loading...</div>;

    return (
        <div className="details-container">
            <button onClick={() => navigate(-1)} className="back-button">← Back</button>
            <div className="passport-card">
                <div className="passport-photo">
                    <img src={villager.image_url} alt={villager.name} />
                </div>
                <div className="passport-info">
                    <h1>{villager.name}</h1>
                    <hr />
                    <p><strong>Species :</strong> {villager.species}</p>
                    <p><strong>Personality :</strong> {villager.personality}</p>
                    <p><strong>Birthday :</strong> {villager.birthday_day} {villager.birthday_month}</p>
                    <p><strong>Sentence :</strong> "{villager.phrase}"</p>

                    <button
                        onClick={toggleFavorite}
                        className={`fav-btn ${isFavorite ? 'remove' : 'add'}`}
                    >
                        {isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VillagerDetails;