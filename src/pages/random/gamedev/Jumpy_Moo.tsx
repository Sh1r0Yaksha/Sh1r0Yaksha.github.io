import { useEffect, useState } from "react";
import UnityPlayer from "../../../components/UnityPlayer";

export default function Jumpy_Moo() {
  const [dimensions, setDimensions] = useState(getDimensions());

  function getDimensions() {
    const isSmall = window.innerWidth < 960;
    return {
      width: isSmall ? (window.innerWidth - 50) : 960,
      height: isSmall ? Math.floor((window.innerWidth - 50) / 1.5 ) : 600,
    };
  }

  useEffect(() => {
    function handleResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <UnityPlayer src="/Games/Jumpy_Moo/index.html" title="Jumpy Moo" width={dimensions.width} height={dimensions.height} />
    </>
  );
}
