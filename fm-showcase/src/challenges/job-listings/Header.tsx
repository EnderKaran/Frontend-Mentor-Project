import { useState, useEffect } from "react";
import bgHeaderMobileUrl from "./images/bg-header-mobile.png";
import bgHeaderDesktopUrl from "./images/bg-header-desktop.png";

export default function Header() {
  const [bgImage, setBgImage] = useState(bgHeaderDesktopUrl);

  useEffect(() => {
    const updateBackground = () => {
      setBgImage(window.innerWidth < 768 ? bgHeaderMobileUrl : bgHeaderDesktopUrl);
    };
    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <header
      className="h-[156px] bg-job-primary bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    />
  );
}