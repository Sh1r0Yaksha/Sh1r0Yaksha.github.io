import { useEffect, useRef } from "react";

type UnityPlayerProps = {
  src: string;
  title: string;
  width: string | number;
  height: string | number;
};

export default function UnityPlayer({ src, title, width, height }: UnityPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Focus the iframe when component mounts
    iframeRef.current?.focus();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      width={width}
      height={height}
      allowFullScreen
      tabIndex={-1} // Make the iframe focusable
      style={{ display: "block", border: "none", background: "#000" }}
    />
  );
}
