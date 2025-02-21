import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DecodedWeatherConditions } from "@/lib/types";
import Image from "next/image";
import type { PropsWithoutRef } from "react";
import { Skeleton } from "./ui/skeleton";

export interface CurrentWeatherProps {
  temp?: number;
  weatherConditions?: DecodedWeatherConditions;
  city?: string;
  country?: string;
}

export function CurrentWeather({
  temp,
  weatherConditions,
  city,
  country,
}: PropsWithoutRef<CurrentWeatherProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 justify-between">
          <span>Current Weather</span>
          {city && country && (
            <span className="font-normal text-sm leading-0 text-muted-foreground">
              {city}, {country}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              {weatherConditions?.image && (
                <Image
                  width={64}
                  height={64}
                  src={weatherConditions?.image ?? ""}
                  alt={weatherConditions?.description ?? ""}
                />
              )}
              {!weatherConditions?.image && (
                <Skeleton className="size-8 m-4 rounded-full" />
              )}
            </div>
            <div className="relative">
              <div className="text-4xl font-bold">
                {temp && temp.toFixed(1) + "°C"}
                {!temp && <Skeleton className="w-28 h-8" />}
              </div>
              {weatherConditions?.description && (
                <p className="text-muted-foreground">
                  {weatherConditions?.description}
                </p>
              )}
              {!weatherConditions?.description && (
                <Skeleton className="w-10 h-4 mt-2" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
