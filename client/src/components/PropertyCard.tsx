import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";
import { Link } from "wouter";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <div className="flex gap-2">
            {property.isForSale && (
              <Badge variant="secondary">For Sale</Badge>
            )}
            {property.isForRent && (
              <Badge variant="outline">For Rent</Badge>
            )}
          </div>
        </div>
        <p className="text-2xl font-bold text-primary mb-4">
          R$ {property.price.toLocaleString()}
        </p>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {property.city}, {property.state}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.squareMeters}m²</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/property/${property.id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
