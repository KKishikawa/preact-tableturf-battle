import { decodeInkInfo } from '@/models/card';

const toNumGrid = (g: string | null | undefined) =>
  decodeInkInfo(g).map((num) => ({
    x: (num % 8) * 12 + 0.5,
    y: (0 | (num / 8)) * 12 + 0.5,
  }));

const Grids = ({
  g,
  color,
}: {
  g: string | null | undefined;
  color: string;
}) => (
  <>
    {toNumGrid(g).map((coord) => (
      <rect
        width="12"
        height="12"
        x={coord.x}
        y={coord.y}
        stroke="#000"
        fill={color}
      />
    ))}
  </>
);
export const CardGrid = ({
  g,
  sg,
}: {
  g: string | null | undefined;
  sg: string | null | undefined;
}) => {
  return (
    <svg width="97" height="97" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="__a" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12.5.5H.5V13" fill="none" stroke="#d1d5db" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#6b7080" />
      <rect width="100%" height="100%" fill="url(#__a)" />
      <Grids color="#fde047" g={g} />
      <Grids color="#d97706" g={sg} />
    </svg>
  );
};
