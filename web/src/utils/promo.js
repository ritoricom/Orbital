import promoImgObn from "@/assets/images/obn/promo.jpg";
import promoImgSpb from "@/assets/images/spb/promo.jpg";
import promoImgNvz from "@/assets/images/nvz/promo.jpg";

export const getPromoImgByCity = (city) => {
  switch (city) {
    case "obn":
      return promoImgObn;
    case "nvz":
      return promoImgNvz;
    case "spb":
    default:
      return promoImgSpb;
  }
};
