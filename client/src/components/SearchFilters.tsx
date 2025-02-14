import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterValues {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  type?: 'all' | 'sale' | 'rent';
  city?: string;
}

interface SearchFiltersProps {
  onFilter: (filters: FilterValues) => void;
}

export function SearchFilters({ onFilter }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterValues>({
    type: 'all'
  });

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="grid gap-4">
          <div>
            <Label>Property Type</Label>
            <Select
              value={filters.type}
              onValueChange={(value) =>
                setFilters({ ...filters, type: value as FilterValues['type'] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>City</Label>
            <Input
              placeholder="Enter city"
              value={filters.city || ''}
              onChange={(e) =>
                setFilters({ ...filters, city: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Price Range (R$)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  setFilters({ ...filters, minPrice: Number(e.target.value) })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <Label>Minimum Bedrooms</Label>
            <Select
              value={filters.bedrooms?.toString()}
              onValueChange={(value) =>
                setFilters({ ...filters, bedrooms: Number(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleFilter} className="w-full">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
