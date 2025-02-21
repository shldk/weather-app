import type { DecodedWeatherConditions, TemperatureRange } from "@/lib/types";
import Image from "next/image";
import type { PropsWithoutRef } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface DailyRangeForecastProps {
  tempRange: TemperatureRange;
  weatherConditions: DecodedWeatherConditions;
}

export function DailyRangeForecast({
  tempRange,
  weatherConditions,
}: PropsWithoutRef<DailyRangeForecastProps>) {
  return (
    // <Card>
    //   <CardHeader>
    //     <CardTitle>{days[tempRange.time.getDay()]}</CardTitle>
    //   </CardHeader>
    //   <CardContent>
    <div className="flex flex-col items-center gap-y-2 text-center">
      <span className="font-medium">{days[tempRange.time.getDay()]}</span>
      <Image
        src={weatherConditions.image}
        alt={weatherConditions.description}
        width={64}
        height={64}
      />
      <div className="space-x-2 text-sm">
        <span className="font-medium">H: {tempRange.tempMax.toFixed(0)}°</span>
        <span className="text-muted-foreground">
          L: {tempRange.tempMin.toFixed(0)}°
        </span>
      </div>
      <span className="text-sm">{weatherConditions.description}</span>
    </div>
    // </CardContent>
    // </Card>
  );
}
