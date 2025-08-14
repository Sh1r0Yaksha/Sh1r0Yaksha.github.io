import { useEffect, useState } from "react";

import UnityPlayer from "../../../components/UnityPlayer";
import Section from "../../../components/Section";
import Header_text from "../../../components/Header_text";
import Header_title from "../../../components/Header_title";
import MD_loader from "../../../components/MD_loader";

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
      <Header_text>
        <Header_title>Wave Function Collapse</Header_title>
        A simple simulation which runs a very primitive version of the wave function collapse algorithm to generate terrain.
      </Header_text>
      <UnityPlayer src="/Games/WFC/index.html" title="Wave Function Collapse" width={dimensions.width} height={dimensions.height} />
      <Section id="WFC">
        <MD_loader src="/data/gamedev/WFC.md"/>
      </Section>
        
    </>
  );
}
