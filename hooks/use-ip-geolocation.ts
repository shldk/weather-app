import type { IpGeolocation } from "@/lib/types";
import { useEffect, useState } from "react";

export function useIpGeolocation() {
  const [data, setData] = useState<IpGeolocation>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.ip.sb/geoip/");
        const data = await response.json();
        setData(data);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
}
