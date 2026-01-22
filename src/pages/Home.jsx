import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';


function Home({ villagers }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredVillagers = villagers.filter((villager) =>
    villager.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1 className="home-title">Villagers</h1>


      <input
        type="text"
        placeholder="Rechercher un habitant..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="villagers-grid">

        {filteredVillagers.map((villager) => (
          <Link to={`/villager/${villager.name}`} key={villager.name} className="villager-card">
            <img
              src={villager.image_url}
              alt={villager.name}
              className="villager-img"
            />
            <p className="villager-name">{villager.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;