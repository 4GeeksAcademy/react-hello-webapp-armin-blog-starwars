import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();

    // Eliminar un favorito
    const handleRemoveFavorite = (id, type) => {
        dispatch({
            type: "REMOVE_FAVORITE",
            payload: { id, type }
        });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">My Favorites</h2>

            {store.favorites.length === 0 ? (
                <div className="alert alert-info text-center">
                    <p>You don't have any favorites yet.</p>
                    <p>Explore characters, planets, and vehicles and add them to your favorites!</p>
                    <Link to="/" className="btn btn-primary mt-2">
                        Go to Home
                    </Link>
                </div>
            ) : (
                <div className="list-group">
                    {store.favorites.map((favorite) => (
                        <div key={`${favorite.type}-${favorite.id}`} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{favorite.name}</h5>
                                <p className="mb-1 text-muted">
                                    {favorite.type === "people" ? "Character" :
                                        favorite.type === "planets" ? "Planet" : "Vehicle"}
                                </p>
                            </div>
                            <div>
                                <Link to={favorite.url} className="btn btn-outline-primary btn-sm me-2">
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleRemoveFavorite(favorite.id, favorite.type)}
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};