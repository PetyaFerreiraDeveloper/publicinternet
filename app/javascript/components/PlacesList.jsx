import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function PlacesList() {
  // state as: a minimum set of parameters that fully represents what i want to render on the screen
  // showLoading: boolean
  // loadedPlaces: [] => gets filled
  const [loading, setLoading] = useState(true);
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    // hit the server and get the places list
    const apiEndpoint = "/api/places";
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setLoadedPlaces(data.places);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const headerClass = "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700";
  const dataClass ="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"

  return (
    <table>
      <thead>
        <tr>
          <th className={headerClass}>Name</th>
          <th className={headerClass}>City</th>
          <th className={headerClass}>Recent Download Speed</th>
          <th className={headerClass}>Recent Download Speed Units</th>
          <th className={headerClass}>Number of measurements</th>
        </tr>
      </thead>
      <tbody>
        {loadedPlaces.map((place, index) => (
          <tr key={index}>
            <td className={dataClass}>{place.name}</td>
            <td className={dataClass}>{place.city}</td>
            <td className={dataClass}>{place.most_recent_download_speed}</td>
            <td className={dataClass}>{place.most_recent_download_units}</td>
            <td className={dataClass}>{place.number_of_measurements}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlacesList;

const placesList = ReactDOM.createRoot(
  document.getElementById("places-list-container")
);
placesList.render(
  <div>
    <PlacesList />
  </div>
);
