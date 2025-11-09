import ReactAnimatedWeather from 'react-animated-weather';

interface AnimatedWeatherIconProps {
  weatherCode: number;
  size?: number;
  animate?: boolean;
}

type IconType =
  | 'CLEAR_DAY'
  | 'CLEAR_NIGHT'
  | 'PARTLY_CLOUDY_DAY'
  | 'PARTLY_CLOUDY_NIGHT'
  | 'CLOUDY'
  | 'RAIN'
  | 'SLEET'
  | 'SNOW'
  | 'WIND'
  | 'FOG';

const getWeatherIconType = (code: number, isNight: boolean = false): IconType => {
  // Clear sky
  if (code === 0 || code === 1) {
    return isNight ? 'CLEAR_NIGHT' : 'CLEAR_DAY';
  }

  // Partly cloudy
  if (code === 2) {
    return isNight ? 'PARTLY_CLOUDY_NIGHT' : 'PARTLY_CLOUDY_DAY';
  }

  // Overcast
  if (code === 3) {
    return 'CLOUDY';
  }

  // Fog
  if (code === 45 || code === 48) {
    return 'FOG';
  }

  // Drizzle
  if (code >= 51 && code <= 55) {
    return 'RAIN';
  }

  // Rain
  if (code >= 61 && code <= 65) {
    return 'RAIN';
  }

  // Snow
  if (code >= 71 && code <= 77) {
    return 'SNOW';
  }

  // Rain showers
  if (code >= 80 && code <= 82) {
    return 'RAIN';
  }

  // Snow showers
  if (code >= 85 && code <= 86) {
    return 'SNOW';
  }

  // Thunderstorm
  if (code >= 95 && code <= 99) {
    return 'RAIN';
  }

  // Default
  return 'CLOUDY';
};

const getIconColor = (code: number): string => {
  // Clear/Sunny
  if (code === 0 || code === 1) return '#FDB813';

  // Partly cloudy
  if (code === 2) return '#FFD700';

  // Cloudy
  if (code === 3) return '#A0A0A0';

  // Fog
  if (code === 45 || code === 48) return '#B0B0B0';

  // Rain/Drizzle
  if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) return '#4A90E2';

  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return '#FFFFFF';

  // Thunderstorm
  if (code >= 95 && code <= 99) return '#5A5A5A';

  return '#A0A0A0';
};

export const AnimatedWeatherIcon = ({
  weatherCode,
  size = 128,
  animate = true,
}: AnimatedWeatherIconProps) => {
  const currentHour = new Date().getHours();
  const isNight = currentHour < 6 || currentHour >= 18;

  const iconType = getWeatherIconType(weatherCode, isNight);
  const color = getIconColor(weatherCode);

  return (
    <ReactAnimatedWeather
      icon={iconType}
      color={color}
      size={size}
      animate={animate}
    />
  );
};
