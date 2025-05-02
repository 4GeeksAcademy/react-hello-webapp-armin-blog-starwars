import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PropTypes from "prop-types";

export const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    // Verificar si este elemento está en favoritos
    const isFavorite = store.favorites.some(
        fav => fav.id === item.uid && fav.type === type
    );

    // Manejar clic en botón de favoritos
    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Evitar navegación al hacer clic en el botón

        if (isFavorite) {
            dispatch({
                type: "REMOVE_FAVORITE",
                payload: { id: item.uid, type }
            });
        } else {
            dispatch({
                type: "ADD_FAVORITE",
                payload: {
                    id: item.uid,
                    name: item.name,
                    type,
                    url: `/detail/${type}/${item.uid}`
                }
            });
        }
    };

    // URL para imágenes basada en starwars-visualguide.com
    const imageUrl = `https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type
        }/${item.uid}.jpg`;

    return (
        <div className="card" style={{ width: "18rem", marginBottom: "20px" }}>
            <img
                src={imageUrl}
                className="card-img-top"
                alt={item.name}
                onError={(e) => {
                    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/detail/${type}/${item.uid}`} className="btn btn-primary">
                        Learn more!
                    </Link>
                    <button
                        onClick={handleFavoriteClick}
                        className="btn btn-link text-danger"
                    >
                        <i className={isFavorite ? "fas fa-heart fa-lg" : "far fa-heart fa-lg"}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};