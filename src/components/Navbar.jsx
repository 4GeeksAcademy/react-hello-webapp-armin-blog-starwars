// import { Link } from "react-router-dom";

// export const Navbar = () => {

// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };

import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FaHeart } from "react-icons/fa";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const favoriteCount = store.favorites.length;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Star Wars Universe
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/people" className="nav-link">Characters</Link>
            </li>
            <li className="nav-item">
              <Link to="/planets" className="nav-link">Planets</Link>
            </li>
            <li className="nav-item">
              <Link to="/vehicles" className="nav-link">Vehicles</Link>
            </li>
          </ul>
          <Link to="/favorites" className="btn btn-outline-warning position-relative">
            <FaHeart className="me-1" />
            Favorites
            {favoriteCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {favoriteCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};