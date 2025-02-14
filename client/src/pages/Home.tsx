import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyMap } from "@/components/PropertyMap";
import { SearchFilters } from "@/components/SearchFilters";
import type { Property } from "@shared/schema";

export default function Home() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ['/api/properties']
  });

  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  const handleFilter = (filters: any) => {
    if (!properties) return;

    let filtered = properties;

    if (filters.type === 'sale') {
      filtered = filtered.filter(p => p.isForSale);
    } else if (filters.type === 'rent') {
      filtered = filtered.filter(p => p.isForRent);
    }

    if (filters.city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }

    setFilteredProperties(filtered);
  };

  const displayProperties = filteredProperties.length > 0 ? filteredProperties : (properties || []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Find Your Perfect Home</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-6">
            <SearchFilters onFilter={handleFilter} />
          </div>

          <div className="space-y-6">
            <div className="h-[400px] rounded-lg overflow-hidden">
              <PropertyMap properties={displayProperties} />
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
