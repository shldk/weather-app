"use client";

import { CurrentWeather } from "@/components/current-weather";
import { DailyRangeForecast } from "@/components/daily-range-forecast";
import { useWeatherData } from "@/hooks/use-weather-data";
import { decodeWeatherConditions } from "@/lib/utils";
import { useMemo } from "react";
export default function HomePage() {
  const { data, error } = useWeatherData();

  if (error) {
    throw new Error("Couldn't fetch your geolocation. Please, allow access to your geolocation or try looking for your city manually.")
  }

  const currentWeatherConditions = useMemo(
    () => data && decodeWeatherConditions(data.current),
    [data],
  );

  return (
    <>
      <CurrentWeather
        temp={data?.current.temp}
        weatherConditions={currentWeatherConditions}
        city={data?.city}
        country={data?.country}
      />
      <div className="grid grid-cols-5 gap-2">
        {!error &&
          data?.daily
            .slice(0, 5)
            .map((day) => (
              <DailyRangeForecast
                key={day.time.getTime()}
                tempRange={day}
                weatherConditions={decodeWeatherConditions(day)}
              />
            ))}
      </div>
    </>
  );
}
