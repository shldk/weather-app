import { Card, CardContent } from "@/components/ui/card";
import type { CurrentWeather, DecodedWeatherConditions } from "@/lib/types";
import { Droplets, Wind } from "lucide-react";
import Image from "next/image";

type WeatherDetailsProps = {
  city: string;
  weather: CurrentWeather<DecodedWeatherConditions>;
};

export function WeatherDetails({ city, weather }: WeatherDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 capitalize">{city}</h1>
        <p className="text-muted-foreground">Detailed Weather Information</p>
      </div>

      <Card className="border-0">
        <CardContent className="pt-4">
          <div className="flex flex-col items-center gap-y-4">
            <Image
              width={96}
              height={96}
              src={weather.image}
              alt={weather.description}
            />
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">
                {weather.temp.toFixed(1)}°C
              </p>
              <p className="text-xl text-muted-foreground">
                {weather.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
              <div className="flex justify-center text-center gap-2">
                <Wind className="h-4 w-4" />
                <span>{weather.windSpeedKmh.toFixed(2)} km/h</span>
              </div>
              <div className="flex justify-center text-center gap-2">
                <Droplets className="h-4 w-4" />
                <span>{weather.relativeHumidityPercentage}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
