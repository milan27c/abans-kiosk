import OfferPage from "../../components/offer-page";
import { jvcOfferProducts } from "../../data/catalog";

export default function JvcOfferPage() {
  return (
    <OfferPage
      banner="/images/jvcoffer/banner.png"
      bannerAlt="JVC Party Speakers offer"
      products={jvcOfferProducts}
    />
  );
}
