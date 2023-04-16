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

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Recent Download Speed</th>
          <th>Recent Download Speed Units</th>
          <th>Number of measurements</th>
        </tr>
      </thead>
      <tbody>
        {loadedPlaces.map((place, index) => (
          <tr key={index}>
            <td>{place.name}</td>
            <td>{place.city}</td>
            <td>{place.most_recent_download_speed}</td>
            <td>{place.most_recent_download_units}</td>
            <td>{place.number_of_measurements}</td>
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
