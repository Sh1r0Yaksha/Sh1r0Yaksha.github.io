type UnityPlayerProps = {
  src: string;
  title: string;
  width: string | number;
  height: string | number;
};

export default function UnityPlayer({src, title, width, height}: UnityPlayerProps) {
  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      allowFullScreen
      style={{ display: "block", border: "none", background: "#000" }}
    />
  );
}
