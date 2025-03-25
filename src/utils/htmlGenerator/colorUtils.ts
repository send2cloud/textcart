
/**
 * Adjusts a hex color by the given percentage
 * @param color Hex color string
 * @param percent Percentage to adjust (-100 to 100)
 * @returns Adjusted hex color
 */
export const adjustColor = (color: string, percent: number): string => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + Math.round(R * percent / 100)));
  G = Math.min(255, Math.max(0, G + Math.round(G * percent / 100)));
  B = Math.min(255, Math.max(0, B + Math.round(B * percent / 100)));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
};
