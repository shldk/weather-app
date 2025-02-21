import { WeatherDetails } from "@/components/weather-details";
import { fetchWeather } from "@/lib/api";
import { decodeWeatherConditions } from "@/lib/utils";

export default async function CityPage({
  params,
  searchParams,
}: {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ latitude: number; longitude: number }>;
}) {
  const { city } = await params;
  const { latitude, longitude } = await searchParams;
  const { current } = await fetchWeather(latitude, longitude, ["current"]);

  return (
    <WeatherDetails
      city={decodeURIComponent(city)}
      weather={{ ...current, ...decodeWeatherConditions(current) }}
    />
  );
}
