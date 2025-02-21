import weatherCodeMap from "@/weather-code-map.json";

export type WeatherCode = keyof typeof weatherCodeMap;

export interface DecodedWeatherConditions {
  description: string;
  image: string;
}

export interface Weather<Conditions> {
  current: CurrentWeather<Conditions>;
  daily: DailyWeather<Conditions>;
}

export type WeatherScope = keyof Weather<any>;

export type CurrentWeather<Conditions> = Temperature &
  Conditions & {
    relativeHumidityPercentage: number;
    windSpeedKmh: number;
  };

export type DailyWeather<Conditions> = Array<TemperatureRange & Conditions>;

export interface EncodedWeatherConditions {
  weatherCode: WeatherCode;
  isDay: boolean;
}

export interface Temperature {
  temp: number;
}

export interface TemperatureRange {
  time: Date;
  tempMin: number;
  tempMax: number;
}

export interface AnyGeolocation {
  longitude: number;
  latitude: number;
  country?: string;
  city?: string;
}

export interface NavigatorGeolocation {
  latitude: number;
  longitude: number;
}

export type IpGeolocation = Required<AnyGeolocation>
