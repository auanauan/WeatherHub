import type { TranslationKeys } from './en';

export const th: TranslationKeys = {
  // Common
  common: {
    loading: 'กำลังโหลด...',
    error: 'ข้อผิดพลาด',
    noData: 'ไม่มีข้อมูล',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    delete: 'ลบ',
    edit: 'แก้ไข',
    add: 'เพิ่ม',
    search: 'ค้นหา',
    close: 'ปิด',
    confirm: 'ยืนยัน',
  },

  // Navigation
  nav: {
    dashboard: 'แดชบอร์ด',
    locations: 'สถานที่',
    compare: 'เปรียบเทียบ',
    settings: 'ตั้งค่า',
  },

  // Dashboard
  dashboard: {
    title: 'แดชบอร์ดสภาพอากาศ',
    selectLocation: 'เลือกสถานที่',
    noLocations: 'ยังไม่มีสถานที่ เพิ่มสถานที่แรกของคุณเพื่อเริ่มต้น!',
    exportHourly: 'ส่งออกข้อมูลรายชั่วโมง',
    exportDaily: 'ส่งออกสรุปรายวัน',
    hourlyWeather: 'สภาพอากาศรายชั่วโมง',
    dailySummary: 'สรุปรายวัน',
    forecast: 'พยากรณ์อากาศ',
    dayForecast: 'พยากรณ์อากาศ {{days}} วัน',
  },

  // Weather Card
  weather: {
    temperature: 'อุณหภูมิ',
    feelsLike: 'รู้สึกเหมือน',
    humidity: 'ความชื้น',
    windSpeed: 'ความเร็วลม',
    precipitation: 'ปริมาณฝน',
    pressure: 'ความกดอากาศ',
    visibility: 'ทัศนวิสัย',
    cloudCover: 'เมฆปกคลุม',
    uvIndex: 'ดัชนี UV',
    sunrise: 'พระอาทิตย์ขึ้น',
    sunset: 'พระอาทิตย์ตก',
    currentWeather: 'สภาพอากาศปัจจุบัน',
    lastUpdated: 'อัปเดตล่าสุด',
  },

  // UV Index Levels
  uvLevels: {
    low: 'ต่ำ',
    moderate: 'ปานกลาง',
    high: 'สูง',
    veryHigh: 'สูงมาก',
    extreme: 'รุนแรง',
  },

  // Weather Conditions
  weatherConditions: {
    clearSky: 'ท้องฟ้าแจ่มใส',
    mainlyClear: 'แจ่มใสเป็นส่วนใหญ่',
    partlyCloudy: 'มีเมฆบางส่วน',
    overcast: 'มีเมฆมาก',
    fog: 'หมอก',
    drizzle: 'ฝนละออง',
    rain: 'ฝน',
    heavyRain: 'ฝนหนัก',
    snow: 'หิมะ',
    rainShowers: 'ฝนตกเป็นห่า',
    snowShowers: 'หิมะตกเป็นห่า',
    thunderstorm: 'พายุฟ้าคะนอง',
  },

  // Insights
  insights: {
    title: 'ข้อมูลเชิงลึกสภาพอากาศ',
    extremeHeat: 'คำเตือนอากาศร้อนจัด',
    extremeHeatDesc: 'อุณหภูมิสูงมาก! ดื่มน้ำให้เพียงพอและหลีกเลี่ยงกิจกรรมกลางแจ้งในช่วงเที่ยง',
    hotWeather: 'อากาศร้อน',
    hotWeatherDesc: 'วันนี้อากาศค่อนข้างร้อน อย่าลืมดื่มน้ำมากๆ และทาครีมกันแดด',
    coldWeather: 'อากาศหนาว',
    coldWeatherDesc: 'แต่งตัวให้อุ่นๆ! ข้างนอกหนาว ใส่เสื้อผ้าที่อบอุ่น',
    perfectWeather: 'สภาพอากาศสมบูรณ์แบบ',
    perfectWeatherDesc: 'อากาศดีเหมาะสำหรับกิจกรรมกลางแจ้ง!',
    heavyRain: 'ฝนหนัก',
    heavyRainDesc: 'คาดว่าจะมีฝนตกหนัก อยู่ในที่ร่มหากทำได้และหลีกเลี่ยงการขับรถ',
    lightRain: 'คาดว่าจะมีฝน',
    lightRainDesc: 'อย่าลืมพกร่ม! คาดว่าวันนี้จะมีฝน',
    highHumidity: 'ความชื้นสูง',
    highHumidityDesc: 'วันนี้อากาศชื้นมาก คุณอาจรู้สึกร้อนกว่าอุณหภูมิจริง',
    lowHumidity: 'ความชื้นต่ำ',
    lowHumidityDesc: 'อากาศแห้งวันนี้ ดื่มน้ำให้เพียงพอและลองใช้ครีมบำรุงผิว',
    strongWind: 'ลมแรง',
    strongWindDesc: 'สภาพอากาศมีลมแรงมาก ยึดของหลวมๆ และระวังเมื่ออยู่กลางแจ้ง',
    moderateWind: 'ลมปานกลาง',
    moderateWindDesc: 'วันนี้มีลมพัดปานกลาง จับหมวกไว้ให้แน่น!',
    outdoorActivities: 'เหมาะออกกำลังกาย',
    outdoorActivitiesDesc: 'สภาพอากาศเหมาะสำหรับวิ่ง ปั่นจักรยาน หรือกีฬากลางแจ้ง!',
    thunderstormAlert: 'แจ้งเตือนพายุฟ้าคะนอง',
    thunderstormAlertDesc: 'ตรวจพบพายุฟ้าคะนอง อยู่ในที่ร่มและหลีกเลี่ยงพื้นที่โล่ง',
    gettingWarmer: 'อากาศจะอุ่นขึ้น',
    gettingCooler: 'อากาศจะเย็นลง',
    tempChange: 'อุณหภูมิจะ{{direction}} {{amount}}°C ในวันพรุ่งนี้',
    tempChangeRise: 'เพิ่มขึ้น',
    tempChangeDrop: 'ลดลง',
    rainComing: 'ฝนกำลังจะมา',
    rainComingDesc: 'คาดว่าจะมีฝนในอีกไม่กี่วันข้างหน้า วางแผนล่วงหน้า!',
  },

  // Trend
  trend: {
    stable: 'อุณหภูมิคงที่ในช่วงนี้',
    rising: 'อุณหภูมิมีแนวโน้มเพิ่มขึ้น {{amount}}°C',
    falling: 'อุณหภูมิมีแนวโน้มลดลง {{amount}}°C',
  },

  // Locations
  locations: {
    title: 'จัดการสถานที่',
    addLocation: 'เพิ่มสถานที่',
    searchPlaceholder: 'ค้นหาเมือง...',
    selectFromMap: 'หรือเลือกจากแผนที่',
    noResults: 'ไม่พบผลลัพธ์',
    deleteConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบสถานที่นี้?',
    deleteSuccess: 'ลบสถานที่เรียบร้อยแล้ว',
    addSuccess: 'เพิ่มสถานที่เรียบร้อยแล้ว',
    coordinates: 'พิกัด',
  },

  // Compare
  compare: {
    title: 'เปรียบเทียบสถานที่',
    selectLocation1: 'เลือกสถานที่แรก',
    selectLocation2: 'เลือกสถานที่ที่สอง',
    compareTitle: 'เปรียบเทียบ: {{location1}} vs {{location2}}',
    tempDifference: 'ความแตกต่างของอุณหภูมิ',
    humidityDifference: 'ความแตกต่างของความชื้น',
    selectTwoLocations: 'กรุณาเลือกสองสถานที่ที่แตกต่างกันเพื่อเปรียบเทียบ',
  },

  // Date Range
  dateRange: {
    lastDays: '{{days}} วันที่แล้ว',
    last7Days: '7 วันที่แล้ว',
    last14Days: '14 วันที่แล้ว',
    last30Days: '30 วันที่แล้ว',
    customRange: 'กำหนดช่วงเอง',
    startDate: 'วันเริ่มต้น',
    endDate: 'วันสิ้นสุด',
    apply: 'ใช้งาน',
  },

  // Settings
  settings: {
    title: 'ตั้งค่า',
    theme: 'ธีม',
    language: 'ภาษา',
    darkMode: 'โหมดมืด',
    lightMode: 'โหมดสว่าง',
    units: 'หน่วย',
    temperature: 'อุณหภูมิ',
    celsius: 'เซลเซียส (°C)',
    fahrenheit: 'ฟาเรนไฮต์ (°F)',
    windSpeed: 'ความเร็วลม',
    kmh: 'กม./ชม.',
    mph: 'ไมล์/ชม.',
    ms: 'ม./วิ',
  },

  // Alerts
  alerts: {
    exportSuccess: 'ส่งออกข้อมูล{{type}}เรียบร้อยแล้ว!',
    hourlyData: 'สภาพอากาศรายชั่วโมง',
    dailyData: 'สรุปรายวัน',
  },

  // Chart Labels
  chart: {
    temperature: 'อุณหภูมิ (°C)',
    humidity: 'ความชื้น (%)',
    windSpeed: 'ความเร็วลม (กม./ชม.)',
    precipitation: 'ปริมาณฝน (มม.)',
    maxTemp: 'อุณหภูมิสูงสุด (°C)',
    minTemp: 'อุณหภูมิต่ำสุด (°C)',
    rainTotal: 'ปริมาณฝนรวม (มม.)',
    windMax: 'ลมสูงสุด (กม./ชม.)',
  },
};
