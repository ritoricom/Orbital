import { isNonNullable } from "@/utils/equals";

const getSelectionList = ({ initialCity, labels: { spb, obn, nvz } }) => {
  const cities = [
    {
      id: "e4e2e148-3130-4231-ba8d-0ce53871429b",
      kind: "spb",
      label: spb,
    },
    {
      id: "4e84fff2-95e2-4f24-9920-6c9d1ca3e2c5",
      kind: "obn",
      label: obn,
    },
    {
      id: "498e9225-1ada-41af-bed1-d36fdfc87e79",
      kind: "nvz",
      label: nvz,
    },
  ];

  cities.sort(({ kind }) => (kind === initialCity ? -1 : 1));

  return cities.map(({ id, label }) => `${id},${label}`).join(",");
};

export const initBnovo = (
  rootID,
  { lang, widgetVariant, initialCity, labels: { spb, obn, nvz } }
) => {
  const bnovoWidget = window.Bnovo_Widget;
  const bnovoWidgetInfo = window._bnovo_widget;

  const openBnovoWidget = () => {
    bnovoWidget.open(rootID, {
      type: widgetVariant === "adapt" ? "select" : "horselect",
      select_list: getSelectionList({
        initialCity,
        labels: { spb, obn, nvz },
      }),
      lang: lang,
      width: widgetVariant === "adapt" ? "112%" : "100%",
      background: widgetVariant === "adapt" ? "#F4F3F1" : "#2D2D2D",
      border_radius: "4",
      without_title: "on",
      bg_alpha: widgetVariant === "adapt" ? "100" : "0",
      padding: "0",
      font_size: widgetVariant === "adapt" ? "14" : "12",
      inp_bordhover: "#d1a96e",
      inp_bordcolor: "#E4DFD4",
      inp_alpha: "0",
      btn_background: "#d1a96e",
      btn_background_over: "#b2915e",
      btn_textcolor: "#ffffff",
      btn_textover: "#ffffff",
      btn_bordcolor: "#d1a96e",
      btn_bordhover: "#b2915e",
      _logo_background: "none",
      dates_preset: "on",
      dfrom_today: "on",
      dfrom_value: "2",
      dto_nextday: "on",
      dto_value: "2",
      force_redirect: "on",
    });
  };

  if (!isNonNullable(bnovoWidgetInfo)) {
    bnovoWidget.init(() => {
      openBnovoWidget();
    });
  } else {
    openBnovoWidget();
  }
};
