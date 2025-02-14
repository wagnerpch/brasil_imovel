import { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import type { Property } from "@shared/schema";

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const defaultCenter = { lat: -23.5505, lng: -46.6333 }; // São Paulo

const loadGoogleMapsScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });
};

export function PropertyMap({
  properties,
  onPropertySelect,
  center = defaultCenter,
  zoom = 12
}: PropertyMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
      setError("Google Maps API key não configurada");
      setIsLoading(false);
      return;
    }

    loadGoogleMapsScript()
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.error("Erro ao carregar Google Maps:", err);
        setError("Erro ao carregar o Google Maps");
        setIsLoading(false);
      });
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted">
        <p>Carregando mapa...</p>
      </div>
    );
  }

  if (error || !import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted">
        <p>{error || "Chave da API do Google Maps não configurada"}</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full min-h-[400px]"
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      }}
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={{
            lat: Number(property.latitude),
            lng: Number(property.longitude)
          }}
          onClick={() => onPropertySelect?.(property)}
          title={property.title}
        />
      ))}
    </GoogleMap>
  );
}