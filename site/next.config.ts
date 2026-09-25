import type { NextConfig } from "next";
import { BASE } from "./lib/base";

const nextConfig: NextConfig = {
  basePath: BASE,
  // The dev "N" badge sits bottom-left, on top of the Consent Preferences button.
  devIndicators: false,
};

export default nextConfig;
