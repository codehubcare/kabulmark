interface DividerProps {
  className?: string;
  color?: string;
}

const Divider = ({ className, color = "gray" }: DividerProps) => {
  const colorClass = `bg-${color}-200`;

  return <div className={`w-px ${colorClass} mx-2 ${className}`} />;
};

export default Divider;
