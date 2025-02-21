import weatherCodeMap from "@/weather-code-map.json";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DecodedWeatherConditions, EncodedWeatherConditions } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function decodeWeatherConditions(
  conditions: EncodedWeatherConditions,
): DecodedWeatherConditions {
  return weatherCodeMap[conditions.weatherCode][
    conditions.isDay ? "day" : "night"
  ];
}

