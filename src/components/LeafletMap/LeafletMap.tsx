import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LeafletMap.css";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import PropTypes from "prop-types";
import markerIcon2 from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// This is to get the marker icon to show on map
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Simple Leaflet map component
const LeafletMap = (props: {
  latitude: number;
  longitude: number;
  sunrise: string;
}) => {
  const mapRef = useRef(null);
  const [latLng, setLatLng] = useState<LatLngExpression>(null);

  // When the sunrise value changes, we need to move the map to a new location
  useEffect(() => {
    if (props.latitude && props.longitude) {
      const newLatLng: LatLngExpression = [props.latitude, props.longitude];
      mapRef.current.setView(newLatLng, 10);
      setLatLng(newLatLng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sunrise]);

  return (
    <div className="p-3 mx-3" data-testid="leafletMap">
      <MapContainer
        className="leaflet-map-container"
        ref={mapRef}
        center={[39.8283, -98.5795]}
        zoom={3}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {latLng ? <Marker position={latLng}></Marker> : null}
      </MapContainer>
    </div>
  );
};

LeafletMap.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  sunrise: PropTypes.string,
};

export default LeafletMap;
