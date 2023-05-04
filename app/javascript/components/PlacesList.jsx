import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function renderPlacesPage(body) {
  return (
    <>
      <div className="flex justify-between items-center sm-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <h3>Internet Places</h3>
        <div className="flex justify-between items-center w-1/3">
          <form className="">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
              <button
                type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            New Log
          </button>
        </div>
      </div>
      {body}
    </>
  );
}

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

  const loadingSection = <div>Loading...</div>;

  const dataSection = (
    <section className="sm-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block shadow rounded-lg overflow-hidden">
        <table className="w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                City
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Recent Download Speed
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Recent Download Speed Units
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Number of measurements
              </th>
              <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                Number of measurements
              </th>
            </tr>
          </thead>
          <tbody>
            {loadedPlaces.map((place, index) => (
              <tr key={index}>
                <td className="w-1/3 text-left py-3 px-4">{place.name}</td>
                <td className="w-1/3 text-left py-3 px-4">{place.city}</td>
                <td className="w-1/3 text-left py-3 px-4">
                  {place.most_recent_download_speed}
                </td>
                <td className="w-1/3 text-left py-3 px-4">
                  {place.most_recent_download_units}
                </td>
                <td className="w-1/3 text-left py-3 px-4">
                  {place.number_of_measurements}
                </td>
                <td className="w-1/3 text-left py-3 px-4">
                  {place.number_of_measurements}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  if (loading) {
    return renderPlacesPage(loadingSection);
  }

  return renderPlacesPage(dataSection);
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
