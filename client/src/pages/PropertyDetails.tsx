import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { PropertyMap } from "@/components/PropertyMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin, Share2, Heart, HeartOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/hooks/useFavorites";
import { useShare } from "@/hooks/useShare";
import type { Property } from "@shared/schema";

export default function PropertyDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { shareProperty } = useShare();

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${id}`]
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="h-[600px] bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Property not found</h1>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    const propertyId = Number(property.id);
    if (isFavorite(propertyId)) {
      removeFavorite(propertyId);
      toast({
        description: "Removido dos favoritos",
      });
    } else {
      addFavorite(propertyId);
      toast({
        description: "Adicionado aos favoritos",
      });
    }
  };

  const handleShareClick = async () => {
    const result = await shareProperty(property);
    if (result) {
      toast({
        description: result,
      });
    }
  };

  const isFavorited = isFavorite(Number(property.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  {property.address}, {property.city}, {property.state}
                </span>
              </div>
            </div>

            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full aspect-video object-cover rounded-lg"
            />

            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms} Bedrooms</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-2">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms} Bathrooms</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  <span>{property.squareMeters}m²</span>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <PropertyMap
                    properties={[property]}
                    center={{
                      lat: Number(property.latitude),
                      lng: Number(property.longitude)
                    }}
                    zoom={15}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <div className="flex gap-2 mb-4">
                  {property.isForSale && (
                    <Badge variant="secondary">For Sale</Badge>
                  )}
                  {property.isForRent && (
                    <Badge variant="outline">For Rent</Badge>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-bold">
                    R$ {property.price.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <Button className="w-full">Contact Agent</Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline"
                      onClick={handleFavoriteClick}
                      className={isFavorited ? "bg-primary/10" : ""}
                    >
                      {isFavorited ? (
                        <HeartOff className="w-4 h-4 mr-2 text-primary" />
                      ) : (
                        <Heart className="w-4 h-4 mr-2" />
                      )}
                      {isFavorited ? "Saved" : "Save"}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleShareClick}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}