import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";
import { Loading } from "../components/Loading";
import PropTypes from "prop-types";

export const EntityList = ({ type }) => {
  const { store, dispatch } = useGlobalReducer();
  
  // Obtener el tipo de la URL si no se proporciona como prop
  const { entityType } = useParams();
  const entityTypeToUse = type || entityType;
  
  // Función para cargar datos de la API
  const fetchData = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const response = await fetch(`https://www.swapi.tech/api/${entityTypeToUse}`);
      const data = await response.json();
      
      const resultsArray = data.results || data.result || [];
      
      dispatch({ 
        type: `SET_${entityTypeToUse.toUpperCase()}`, 
        payload: resultsArray 
      });
    } catch (error) {
      console.error(`Error fetching ${entityTypeToUse}:`, error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Obtener los datos cuando el componente se monta o cambia el tipo
  useEffect(() => {
    const storeData = store[entityTypeToUse];
    if (!storeData || storeData.length === 0) {
      fetchData();
    }
  }, [entityTypeToUse]);

  // Obtener título y datos según el tipo
  const getTitle = () => {
    switch(entityTypeToUse) {
      case "people": return "Characters";
      case "planets": return "Planets";
      case "vehicles": return "Vehicles";
      default: return entityTypeToUse.charAt(0).toUpperCase() + entityTypeToUse.slice(1);
    }
  };
  
  const entities = store[entityTypeToUse] || [];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{getTitle()}</h2>
      
      {store.loading ? (
        <Loading />
      ) : (
        <div className="row">
          {entities.map((entity) => (
            <div key={entity.uid} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <Card item={entity} type={entityTypeToUse} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

EntityList.propTypes = {
  type: PropTypes.string
};