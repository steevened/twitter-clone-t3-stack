import type { FC, PropsWithChildren } from "react";

interface IconHoverEffectProps {
  red?: boolean;
}

const IconHoverEffect: FC<PropsWithChildren<IconHoverEffectProps>> = ({
  children,
  red = false,
}) => {
  const colorClasses = red
    ? "outline-red-400 hover:bg-red-900/30 group-hover:bg-red-900/30 group-focus:bg-red-900/30 group-focus-visible:bg-red-900/30 focus-visible:bg-red-900/30"
    : "outline-gray-900 hover:bg-gray-900/80 group-hover:bg-gray-900/80 group-focus:bg-gray-900/80 group-focus-visible:bg-gray-900/80 focus-visible:bg-gray-900/80";

  return (
    <div className={`rounded-full p-2  duration-100 ${colorClasses}`}>
      {children}
    </div>
  );
};

export default IconHoverEffect;
