import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'realEstateFavorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (propertyId: number) => {
    setFavorites(prev => [...prev, propertyId]);
  };

  const removeFavorite = (propertyId: number) => {
    setFavorites(prev => prev.filter(id => id !== propertyId));
  };

  const isFavorite = (propertyId: number) => {
    return favorites.includes(propertyId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
