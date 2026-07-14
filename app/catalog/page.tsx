import { Suspense } from "react";
import CatalogView from "./catalog-view";

export default function CatalogPage() {
  return (
    <Suspense fallback={null}>
      <CatalogView />
    </Suspense>
  );
}
