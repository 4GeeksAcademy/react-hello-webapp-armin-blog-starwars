// import rigoImageUrl from "../assets/img/rigo-baby.jpg";
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// export const Home = () => {

//   const {store, dispatch} =useGlobalReducer()

// 	return (
// 		<div className="text-center mt-5">
// 			<h1>Hello Rigo!!</h1>
// 			<p>
// 				<img src={rigoImageUrl} />
// 			</p>
// 		</div>
// 	);
// }; 

import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";
import { Loading } from "../components/Loading";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  // Función para cargar datos de la API
  const fetchData = async (type) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      
      const response = await fetch(`https://www.swapi.tech/api/${type}`);
      const data = await response.json();
      
      // SWAPI devuelve un formato diferente para cada tipo, normalizamos la estructura
      const resultsArray = data.results || data.result || [];
      
      dispatch({ 
        type: `SET_${type.toUpperCase()}`, 
        payload: resultsArray 
      });
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Cargar datos cuando el componente se monta
  useEffect(() => {
    if (store.people.length === 0) fetchData("people");
    if (store.planets.length === 0) fetchData("planets");
    if (store.vehicles.length === 0) fetchData("vehicles");
  }, []);

  return (
    <div className="container mt-4">
      {store.loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-center mb-4">Welcome to Star Wars Universe</h2>
          
          <h3 className="mb-3">Characters</h3>
          <div className="d-flex flex-wrap justify-content-between">
            {store.people.slice(0, 4).map((person) => (
              <Card key={person.uid} item={person} type="people" />
            ))}
          </div>
          
          <h3 className="mb-3 mt-4">Planets</h3>
          <div className="d-flex flex-wrap justify-content-between">
            {store.planets.slice(0, 4).map((planet) => (
              <Card key={planet.uid} item={planet} type="planets" />
            ))}
          </div>
          
          <h3 className="mb-3 mt-4">Vehicles</h3>
          <div className="d-flex flex-wrap justify-content-between">
            {store.vehicles.slice(0, 4).map((vehicle) => (
              <Card key={vehicle.uid} item={vehicle} type="vehicles" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};