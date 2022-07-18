import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const TrackingOrder = () => {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Watch Latitude is :", position.coords.latitude);
        console.log("Watch Longitude is :", position.coords.longitude);
      });
    }
  }, []);
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  const onMarkerClick = (e) => {
    console.log(e);
  };
  return (
    <div>
      TrackingOrder
      <Map
        google={window.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: location.latitude,
          lng: location.longitude,
        }}
      >
        <Marker onClick={onMarkerClick} name={"This is test name"} />
      </Map>
    </div>
  );
};
// AIzaSyCPAiCmeSurRxK7eZr4jtcuk1A9pn5HdSQ
export default GoogleApiWrapper({
  apiKey: "AIzaSyCPAiCmeSurRxK7eZr4jtcuk1A9pn5HdSQ",
})(TrackingOrder);
