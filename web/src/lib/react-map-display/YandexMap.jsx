import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import PropTypes from "prop-types";

import placemarkIcon from "@/assets/icons/placemark.svg";
import { useRouter } from "next/router";
import styles from "./YandexMap.module.css";

export const YandexMap = ({
  center,
  coordinates,
  width,
  height,
  zoom,
  className,
}) => {
  const { locale } = useRouter();

  return (
    <YMaps className={className} query={{ lang: `${locale}_RU` }}>
      <div className={styles.yandexMap}>
        <Map
          options={{ suppressMapOpenBlock: true }}
          state={{
            center: center,
            zoom: zoom,
          }}
          width={width}
          height={height}
        >
          {coordinates.map((current, index) => (
            <Placemark
              key={index}
              options={{
                iconLayout: "default#image",
                iconImageSize: [34, 41],
                iconImageHref: placemarkIcon.src,
              }}
              geometry={current}
            />
          ))}
        </Map>
      </div>
    </YMaps>
  );
};

YandexMap.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  zoom: PropTypes.number.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
};
