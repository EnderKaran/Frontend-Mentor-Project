import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Stil dosyası burada olmalı
import locationIcon from "./images/icon-location.svg";
import { useEffect } from "react";


// Harita her güncellendiğinde konumu merkeze alan yardımcı
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

const customIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

export default function Map({ lat, lng }: { lat: number; lng: number }) {
  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={13} 
      className="h-full w-full z-0" // Kapsayıcısının tüm alanını doldurur
      style={{ minHeight: "500px" }} // Eğer flex-1 çalışmazsa bu garantiye alır
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={customIcon} />
      <RecenterMap lat={lat} lng={lng} />
    </MapContainer>
  );
}