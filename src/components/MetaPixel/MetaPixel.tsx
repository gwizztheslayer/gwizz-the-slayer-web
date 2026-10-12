"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function MetaPixel() {
  const pathname = usePathname();
  const initialized = useRef(false);
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) return;
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        if (!initialized.current) {
          ReactPixel.init(pixelId);
          initialized.current = true;
        }
        ReactPixel.pageView();
      });
  }, [pathname, pixelId]);

  return null;
}
