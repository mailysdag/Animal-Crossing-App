import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../App.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="nav-link">Villagers</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>

            <div className="navbar-right">
                <img src={logo} alt="Logo" className="nav-logo-img" />
            </div>
        </nav>
    );
}

export default Navbar;