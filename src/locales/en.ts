export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    noData: 'No data available',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    close: 'Close',
    confirm: 'Confirm',
  },

  // Navigation
  nav: {
    dashboard: 'Dashboard',
    locations: 'Locations',
    compare: 'Compare',
    settings: 'Settings',
  },

  // Dashboard
  dashboard: {
    title: 'Weather Dashboard',
    selectLocation: 'Select Location',
    noLocations: 'No locations added yet. Add your first location to get started!',
    exportHourly: 'Export Hourly Data',
    exportDaily: 'Export Daily Summary',
    hourlyWeather: 'Hourly Weather',
    dailySummary: 'Daily Summary',
    forecast: 'Forecast',
    dayForecast: '{{days}}-Day Forecast',
  },

  // Weather Card
  weather: {
    temperature: 'Temperature',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    precipitation: 'Precipitation',
    pressure: 'Pressure',
    visibility: 'Visibility',
    cloudCover: 'Cloud Cover',
    uvIndex: 'UV Index',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    currentWeather: 'Current Weather',
    lastUpdated: 'Last updated',
  },

  // UV Index Levels
  uvLevels: {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    veryHigh: 'Very High',
    extreme: 'Extreme',
  },

  // Weather Conditions
  weatherConditions: {
    clearSky: 'Clear Sky',
    mainlyClear: 'Mainly Clear',
    partlyCloudy: 'Partly Cloudy',
    overcast: 'Overcast',
    fog: 'Fog',
    drizzle: 'Drizzle',
    rain: 'Rain',
    heavyRain: 'Heavy Rain',
    snow: 'Snow',
    rainShowers: 'Rain Showers',
    snowShowers: 'Snow Showers',
    thunderstorm: 'Thunderstorm',
  },

  // Insights
  insights: {
    title: 'Weather Insights',
    extremeHeat: 'Extreme Heat Warning',
    extremeHeatDesc: 'Very high temperature! Stay hydrated and avoid outdoor activities during midday.',
    hotWeather: 'Hot Weather',
    hotWeatherDesc: "It's quite hot today. Remember to drink plenty of water and use sunscreen.",
    coldWeather: 'Cold Weather',
    coldWeatherDesc: "Bundle up! It's cold outside. Wear warm clothes.",
    perfectWeather: 'Perfect Weather',
    perfectWeatherDesc: 'Great weather for outdoor activities!',
    heavyRain: 'Heavy Rain',
    heavyRainDesc: 'Heavy rain expected. Stay indoors if possible and avoid driving.',
    lightRain: 'Rain Expected',
    lightRainDesc: "Don't forget your umbrella! Rain is expected today.",
    highHumidity: 'High Humidity',
    highHumidityDesc: 'Very humid today. You might feel warmer than the actual temperature.',
    lowHumidity: 'Low Humidity',
    lowHumidityDesc: 'Dry air today. Stay hydrated and consider using a moisturizer.',
    strongWind: 'Strong Winds',
    strongWindDesc: 'Very windy conditions. Secure loose objects and be cautious outdoors.',
    moderateWind: 'Moderate Winds',
    moderateWindDesc: 'Breezy conditions today. Hold onto your hat!',
    outdoorActivities: 'Great for Exercise',
    outdoorActivitiesDesc: 'Perfect conditions for jogging, cycling, or outdoor sports!',
    thunderstormAlert: 'Thunderstorm Alert',
    thunderstormAlertDesc: 'Thunderstorm detected. Stay indoors and avoid open areas.',
    gettingWarmer: 'Getting Warmer',
    gettingCooler: 'Getting Cooler',
    tempChange: 'Temperature will {{direction}} by {{amount}}°C tomorrow.',
    tempChangeRise: 'rise',
    tempChangeDrop: 'drop',
    rainComing: 'Rain Coming Soon',
    rainComingDesc: 'Rain expected in the next few days. Plan ahead!',
  },

  // Trend
  trend: {
    stable: 'Temperature has been stable recently',
    rising: 'Temperature trending upward by {{amount}}°C',
    falling: 'Temperature trending downward by {{amount}}°C',
  },

  // Locations
  locations: {
    title: 'Manage Locations',
    addLocation: 'Add Location',
    searchPlaceholder: 'Search for a city...',
    selectFromMap: 'Or select from map',
    noResults: 'No results found',
    deleteConfirm: 'Are you sure you want to delete this location?',
    deleteSuccess: 'Location deleted successfully',
    addSuccess: 'Location added successfully',
    coordinates: 'Coordinates',
  },

  // Compare
  compare: {
    title: 'Compare Locations',
    selectLocation1: 'Select first location',
    selectLocation2: 'Select second location',
    compareTitle: 'Compare: {{location1}} vs {{location2}}',
    tempDifference: 'Temperature Difference',
    humidityDifference: 'Humidity Difference',
    selectTwoLocations: 'Please select two different locations to compare',
  },

  // Date Range
  dateRange: {
    lastDays: 'Last {{days}} Days',
    last7Days: 'Last 7 Days',
    last14Days: 'Last 14 Days',
    last30Days: 'Last 30 Days',
    customRange: 'Custom Range',
    startDate: 'Start Date',
    endDate: 'End Date',
    apply: 'Apply',
  },

  // Settings
  settings: {
    title: 'Settings',
    theme: 'Theme',
    language: 'Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    units: 'Units',
    temperature: 'Temperature',
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    windSpeed: 'Wind Speed',
    kmh: 'km/h',
    mph: 'mph',
    ms: 'm/s',
  },

  // Alerts
  alerts: {
    exportSuccess: '{{type}} data exported successfully!',
    hourlyData: 'Hourly weather',
    dailyData: 'Daily summary',
  },

  // Chart Labels
  chart: {
    temperature: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    windSpeed: 'Wind Speed (km/h)',
    precipitation: 'Precipitation (mm)',
    maxTemp: 'Max Temp (°C)',
    minTemp: 'Min Temp (°C)',
    rainTotal: 'Rain Total (mm)',
    windMax: 'Max Wind (km/h)',
  },
};

export type TranslationKeys = typeof en;
