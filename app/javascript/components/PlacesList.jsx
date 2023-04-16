import React from 'react';
import ReactDOM  from 'react-dom/client'

class PlacesList extends React.Component {
  render() {
    return (
      <ul>
        <li>LA</li>
        <li>SF</li>
        <li>New York</li>
        <li>Hvidovre</li>
      </ul>
    )
  }
}

export default PlacesList

const placesList = ReactDOM.createRoot(document.getElementById('places-list-container'));
placesList.render(<PlacesList />)
