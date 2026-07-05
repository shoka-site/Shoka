"use client";

import dynamic from "next/dynamic";

const ExitIntentPopupDynamic = dynamic(
  () => import("./ExitIntentPopup"),
  { ssr: false }
);

const LeadMagnetModalDynamic = dynamic(
  () => import("./LeadMagnetModal"),
  { ssr: false }
);

export function ExitIntentPopupClient() {
  return (
    <>
      <ExitIntentPopupDynamic />
      <LeadMagnetModalDynamic />
    </>
  );
}
