import Portfolio from "./portfolio";
import { getCopyrightYear } from "./copyright-year.mjs";

export default function Home() {
  // Serialize one server value so hydration never reads the browser clock.
  return <Portfolio copyrightYear={getCopyrightYear()} />;
}
