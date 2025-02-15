import { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import type { Property } from "@shared/schema";

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const defaultCenter = { lat: -23.5505, lng: -46.6333 }; // São Paulo

export function PropertyMap({
  properties,
  onPropertySelect,
  center = defaultCenter,
  zoom = 12
}: PropertyMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    language: 'pt-BR'
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted">
        <p>Erro ao carregar o Google Maps. Por favor, verifique a chave da API.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted">
        <p>Carregando mapa...</p>
      </div>
    );
  }

  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted">
        <p>Chave da API do Google Maps não configurada</p>
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