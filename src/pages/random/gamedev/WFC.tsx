import { useEffect, useState } from "react";
import UnityPlayer from "../../../components/games/UnityPlayer";

export default function WFC() {
  const [dimensions, setDimensions] = useState(getDimensions());

  function getDimensions() {
    const isSmall = window.innerWidth < 1024;
    return {
      width: isSmall ? (window.innerWidth - 50) : 1026,
      height: isSmall ? Math.floor((window.innerWidth - 50) / 1.5 ) : 724,
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
        <UnityPlayer src="/Games/WFC/index.html" title="Wave Function Collapse" width={dimensions.width} height={dimensions.height} />
    </>
  );
}
