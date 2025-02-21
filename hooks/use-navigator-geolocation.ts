"use client";

import type { NavigatorGeolocation } from "@/lib/types";
import { useEffect, useState } from "react";

export function useNavigatorGeolocation() {
  const [data, setData] = useState<NavigatorGeolocation>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => setData(position.coords),
      (err) => setError(err.message),
    );
  }, []);

  return { data, error };
}