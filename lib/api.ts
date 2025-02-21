import { fetchWeatherApi } from "openmeteo";

import type {
  CurrentWeather,
  DailyWeather,
  EncodedWeatherConditions,
  Weather,
  WeatherCode,
  WeatherScope,
} from "./types";

type WeatherApiResponse = Awaited<ReturnType<typeof fetchWeatherApi>>[0];

const variables = {
  current: [
    "temperature_2m",
    "weather_code",
    "is_day",
    "relative_humidity_2m",
    "wind_speed_10m",
  ],
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
};

const mappers = {
  current: (response: WeatherApiResponse) => {
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;

    return {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temp: current.variables(0)!.value(),
      weatherCode: current.variables(1)!.value().toString() as WeatherCode,
      isDay: !!current.variables(2)!.value(),
      relativeHumidityPercentage: current.variables(3)!.value(),
      windSpeedKmh: current.variables(4)!.value(),
    } as CurrentWeather<EncodedWeatherConditions>;
  },
  daily: (response: WeatherApiResponse) => {
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;

    return range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval(),
    ).map((t, i) => ({
      time: new Date((t + utcOffsetSeconds) * 1000),
      weatherCode: daily.variables(0)!.values(i)!.toString() as WeatherCode,
      tempMax: daily.variables(1)!.values(i)!,
      tempMin: daily.variables(2)!.values(i)!,
      isDay: true,
    })) as DailyWeather<EncodedWeatherConditions>;
  },
};

type WeatherForScopes<T extends WeatherScope[]> = {
  [K in T[number]]: Weather<EncodedWeatherConditions>[K];
};

export async function fetchWeather<T extends WeatherScope[]>(
  latitude: number,
  longitude: number,
  scopes: T,
): Promise<WeatherForScopes<T>> {
  const paramsForScopes = scopes.reduce(
    (acc, scope) => {
      return {
        ...acc,
        [scope]: variables[scope],
      };
    },
    {} as Record<WeatherScope, string[]>,
  );

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, {
    latitude,
    longitude,
    timezone: "auto",
    ...paramsForScopes,
  });
  const response = responses[0];

  return scopes.reduce((acc, scope) => {
    return {
      ...acc,
      [scope]: mappers[scope](response),
    };
  }, {} as WeatherForScopes<T>);
}
