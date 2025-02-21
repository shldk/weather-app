import type { AnyGeolocation } from "@/lib/types";
import { useEffect, useState } from "react";
import { useIpGeolocation } from "./use-ip-geolocation";
import { useNavigatorGeolocation } from "./use-navigator-geolocation";

export function useGeolocation() {
  const { data: navigatorGeolocation, error: navigatorGeolocationError } =
    useNavigatorGeolocation();
  const { data: ipGeolocation, error: ipGeolocationError } = useIpGeolocation();

  const [data, setData] = useState<AnyGeolocation>();
  const [error, setError] = useState<string>();

  // Prioritize navigator data if available
  useEffect(() => {
    if (navigatorGeolocation) {
      setData(navigatorGeolocation);
      return;
    }

    // If navigator has errored, then wait for ip data
    if (navigatorGeolocationError) {
      if (ipGeolocation) {
        setData(ipGeolocation);
        return;
      }

      if (ipGeolocationError) {
        setError("Failed to get any geolocation");
      }
    }
  }, [
    navigatorGeolocation,
    ipGeolocation,
    navigatorGeolocationError,
    ipGeolocationError,
  ]);

  return { data, error };
}
