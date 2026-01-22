import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VillagerDetails from './pages/VillagerDetails';
import Favorites from './pages/Favoris';
import Navbar from './components/navbar';
import { getAllVillagers } from './services/api';
import './App.css';

function App() {
  const [villagers, setVillagers] = useState([]);

  useEffect(() => {
    getAllVillagers().then(data => setVillagers(data));
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home villagers={villagers} />} />
        <Route path="/villager/:id" element={<VillagerDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;