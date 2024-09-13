import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import Box from "@mui/material/Box";

import { isNonNullable } from "@/utils/eq";

export interface MapFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

interface YmapEvent {
  get(value: string): unknown;
}

export const MapField = <T extends FieldValues>({
  name,
  control,
}: MapFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { value, onChange } }) => (
      <YMaps>
        <Box
          component={Map}
          width="100%"
          height="100%"
          defaultState={{
            center: value,
            zoom: 6,
          }}
          sx={{
            margin: "16px 0 8px",
            borderRadius: "6px",
          }}
          onClick={(event: YmapEvent) => {
            const coords = event.get("coords");
            if (isNonNullable(coords)) {
              onChange(coords);
            }
          }}
        >
          <Placemark geometry={value} />
        </Box>
      </YMaps>
    )}
  />
);
