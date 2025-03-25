
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

/**
 * Generates CSS color variables based on visual settings
 * @param settings Visual settings object
 * @returns CSS variables string
 */
export const generateColorVariables = (settings: any): string => {
  const {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor,
    darkMode
  } = settings;
  
  // Generate lighter and darker variants of the primary color
  const primaryHover = adjustColor(primaryColor, -10);
  const primaryLight = adjustColor(primaryColor, 30);
  const primaryExtraLight = adjustColor(primaryColor, 60);
  
  // Generate border color based on context
  const borderColor = darkMode ? '#444' : '#e1e1e1';
  
  // Success color for UI feedback
  const successColor = '#4CAF50';
  
  return `
    :root {
      --primary: ${primaryColor};
      --primary-hover: ${primaryHover};
      --primary-light: ${primaryLight};
      --primary-extra-light: ${primaryExtraLight};
      --secondary: ${secondaryColor};
      --accent: ${accentColor};
      --background: ${backgroundColor};
      --text: ${textColor};
      --border: ${borderColor};
      --success: ${successColor};
    }
  `;
};
