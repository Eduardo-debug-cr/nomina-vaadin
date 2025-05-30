import React from 'react';

interface BadgeProps {
  text: string;
  color?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, color = '#3B82F6', className = '' }) => {
  // Calculate contrast color (white or black) based on background color
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getContrastColor = (hexColor: string): string => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#000000';
    
    // Calculate luminance using the formula
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const textColor = getContrastColor(color);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: color,
        color: textColor,
      }}
    >
      {text}
    </span>
  );
};

export default Badge;