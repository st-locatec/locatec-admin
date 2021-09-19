import { smokingPlace, trashcan } from "../constants/Strings";
import { SMOKE, TRASHCAN } from "../types";

export default function mapLocTypeToStr(type) {
   switch (type) {
      case SMOKE:
         return smokingPlace;
      case TRASHCAN:
         return trashcan;
      default:
         return smokingPlace;
   }
}

export function mapStrToLocType(str) {
   switch (str) {
      case smokingPlace:
         return SMOKE;
      case trashcan:
         return TRASHCAN;
      default:
         return SMOKE;
   }
}
