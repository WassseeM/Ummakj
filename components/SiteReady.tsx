"use client";

import { useEffect } from "react";

export default function SiteReady() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("ummakj:ready"));
  }, []);

  return null;
}
