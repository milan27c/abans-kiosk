import OfferPage from "../../components/offer-page";
import { acOfferProducts } from "../../data/catalog";

export default function AcOfferPage() {
  return (
    <OfferPage
      banner="/images/acoffer/banner.png"
      bannerAlt="Haier Inverter Air Conditioner offer"
      products={acOfferProducts}
    />
  );
}
