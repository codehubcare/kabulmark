import km from "./km";
interface DividerProps {
  className?: string;
  color?: string;
}

const Divider = ({ className, color = "gray" }: DividerProps) => {
  const colorClass = km(`bg-${color}-200`);

  return <div className={km(["w-px", colorClass, "mx-2", className || ""])} />;
};

export default Divider;
