import { useQuery } from "@tanstack/react-query";

const fetchCities = async (cityName: string): Promise<City[]> => {
  if (!cityName) return [];

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`,
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch cities.");
  }

  const data = await response.json();
  return (data.results ?? []).map((r: Omit<City, "area">) => ({
    ...r,
    area: [r.admin1, r.admin2, r.admin3, r.admin4].filter(Boolean).join(", "),
  }));
};

export const useCities = (searchQuery: string) => {
  return useQuery({
    queryKey: ["cities", searchQuery],
    queryFn: () => fetchCities(searchQuery),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  });
};

export interface City {
  id: number;
  name: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4?: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
  country_id: number;
  country: string;

  area: string;
}
