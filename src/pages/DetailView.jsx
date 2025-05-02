import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Loading } from "../components/Loading";

export const DetailView = () => {
    const { type, id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verificar si este elemento está en favoritos
    const isFavorite = store.favorites.some(
        fav => fav.id === id && fav.type === type
    );

    // Manejar clic en botón de favoritos
    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch({
                type: "REMOVE_FAVORITE",
                payload: { id, type }
            });
        } else {
            dispatch({
                type: "ADD_FAVORITE",
                payload: {
                    id,
                    name: details?.properties?.name || details?.result?.properties?.name,
                    type,
                    url: `/detail/${type}/${id}`
                }
            });
        }
    };

    // Cargar detalles cuando cambia el tipo o ID
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [type, id]);

    // URL para imágenes basada en starwars-visualguide.com
    const imageUrl = `https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type
        }/${id}.jpg`;

    // Recuperar propiedades según la estructura de la respuesta
    const properties = details?.result?.properties || details?.properties || {};

    // Configurar propiedades a mostrar según el tipo
    const getPropertiesToDisplay = () => {
        switch (type) {
            case "people":
                return [
                    { label: "Height", value: properties.height },
                    { label: "Mass", value: properties.mass },
                    { label: "Hair Color", value: properties.hair_color },
                    { label: "Skin Color", value: properties.skin_color },
                    { label: "Birth Year", value: properties.birth_year },
                    { label: "Gender", value: properties.gender }
                ];
            case "planets":
                return [
                    { label: "Climate", value: properties.climate },
                    { label: "Terrain", value: properties.terrain },
                    { label: "Population", value: properties.population },
                    { label: "Rotation Period", value: properties.rotation_period },
                    { label: "Orbital Period", value: properties.orbital_period },
                    { label: "Diameter", value: properties.diameter }
                ];
            case "vehicles":
                return [
                    { label: "Model", value: properties.model },
                    { label: "Manufacturer", value: properties.manufacturer },
                    { label: "Cost", value: properties.cost_in_credits },
                    { label: "Length", value: properties.length },
                    { label: "Max Speed", value: properties.max_atmosphering_speed },
                    { label: "Crew", value: properties.crew },
                    { label: "Passengers", value: properties.passengers }
                ];
            default:
                return [];
        }
    };

    return (
        <div className="container mt-4">
            {loading ? (
                <Loading />
            ) : (
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={imageUrl}
                                className="img-fluid rounded-start"
                                alt={properties.name}
                                onError={(e) => {
                                    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                                }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="card-title">{properties.name}</h2>
                                    <button
                                        onClick={handleFavoriteClick}
                                        className="btn btn-link text-danger"
                                    >
                                        <i className={isFavorite ? "fas fa-heart fa-lg" : "far fa-heart fa-lg"}></i>
                                    </button>
                                </div>

                                <p className="card-text text-muted mb-4">
                                    {type === "people" ? "Character" : type === "planets" ? "Planet" : "Vehicle"} Details
                                </p>

                                <div className="row">
                                    {getPropertiesToDisplay().map((prop, index) => (
                                        <div className="col-6 mb-3" key={index}>
                                            <h6 className="text-muted">{prop.label}:</h6>
                                            <p>{prop.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3">
                                    <Link to={`/${type}`} className="btn btn-outline-primary me-2">
                                        Back to {type === "people" ? "Characters" : type.charAt(0).toUpperCase() + type.slice(1)}
                                    </Link>
                                    <Link to="/" className="btn btn-outline-secondary">
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};