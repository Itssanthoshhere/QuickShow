const BlurCircle = ({
  top = "auto",
  right = "auto",
  left = "auto",
  bottom = "auto",
}) => {
  return (
    <div
      className="absolute -z-50 h-58 w-58 aspect-square rounded-full bg-primary/30 blur-3xl"
      style={{ top: top, left, right, bottom }}
    ></div>
  );
};

export default BlurCircle;
