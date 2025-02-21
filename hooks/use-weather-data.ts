import { fetchWeather } from "@/lib/api";
import type {
  AnyGeolocation,
  EncodedWeatherConditions,
  Weather,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { useGeolocation } from "./use-geolocation";

export function useWeatherData(): {
  data?: Weather<EncodedWeatherConditions> & AnyGeolocation;
  error?: string;
} {
  const { data: geolocationData, error: geolocationError } = useGeolocation();
  // const { data: geolocationData, error: geolocationError } = useIpGeolocation();
  const [data, setData] = useState<
    Weather<EncodedWeatherConditions> & AnyGeolocation
  >();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const getWeatherData = async () => {
      if (geolocationData) {
        try {
          const data = await fetchWeather(
            geolocationData?.latitude,
            geolocationData?.longitude,
            ["current", "daily"],
          );
          setData({
            ...data,
            ...geolocationData,
          });
        } catch (e: any) {
          setError(e.message);
        }
      }
    };

    getWeatherData();
  }, [geolocationData]);

  return { data, error: error ?? geolocationError };
}
