# 🌤️ Weather Dashboard

A beautiful, modern weather dashboard built with React, Vite, and Tailwind CSS. Get real-time weather information, 7-day forecasts, and detailed meteorological data for any location worldwide.

![Weather Dashboard](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-blueviolet?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss)

## ✨ Features

- **Real-Time Weather Data**: Current temperature, weather conditions, and "feels like" temperature
- **Comprehensive Metrics**: Humidity, wind speed, visibility, atmospheric pressure, UV index, and cloud cover
- **7-Day Forecast**: Daily high/low temperatures, weather conditions, and precipitation predictions
- **Location Search**: Search and switch between any location worldwide with geocoding
- **Beautiful UI**: Glassmorphic design with gradient backgrounds and smooth animations
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop devices
- **No API Keys Required**: Uses free Open-Meteo API (no authentication needed)
- **Fast & Lightweight**: Built with Vite for instant load times and optimal performance

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
```bash
cd "Weather Dashboard"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
The app will be available at `http://localhost:5173` (or the port shown in terminal)

## 📖 Usage

### Search for a Location
1. Click on the search bar at the top
2. Type any city name (e.g., "London", "Tokyo", "New York")
3. Press Enter or click the Search button
4. The dashboard updates instantly with weather data for that location

### View Weather Information
- **Current Conditions**: Large temperature display with weather icon and description
- **Detailed Metrics**: View humidity, wind speed, visibility, pressure, and more in the grid below
- **7-Day Forecast**: Scroll through the forecast cards to see upcoming weather

### Responsive Design
- On mobile: Cards stack vertically, forecast shows one day at a time
- On tablet: 2-column layout with forecast in rows
- On desktop: Full 4-column details and 7-day forecast in one row

## 🛠️ Technologies Used

- **React 19.2**: Modern UI library with hooks
- **Vite 7.2**: Lightning-fast build tool and dev server
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **Lucide React**: Beautiful, consistent icon library
- **Open-Meteo API**: Free weather and geocoding data
- **JavaScript ES6+**: Modern JavaScript features

## 📊 APIs Used

### Open-Meteo Weather API
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Features**:
  - Current weather data
  - Temperature, humidity, wind speed
  - Visibility, pressure, UV index
  - Cloud cover and apparent temperature
  - Daily forecasts for 7+ days
- **Free**: No authentication required
- **Rate Limit**: Generous limits for personal use

### Open-Meteo Geocoding API
- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **Features**:
  - Search locations by name
  - Returns latitude, longitude, and administrative divisions
  - Supports multiple languages
- **Free**: No authentication required

## 📁 Project Structure

```
Weather Dashboard/
├── src/
│   ├── components/
│   │   └── Weather.jsx          # Main weather component
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   ├── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── eslint.config.js            # ESLint rules
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🎨 Component Overview

### Weather.jsx
The main component handling:
- Weather data fetching from Open-Meteo API
- Location search and geocoding
- Weather condition rendering with appropriate icons
- Responsive layout with current conditions and forecast
- Error handling and loading states

**Key Features**:
- `fetchWeatherByCoords()`: Fetches weather for coordinates
- `searchLocation()`: Searches and fetches weather for typed location
- `getWeatherIcon()`: Returns icon based on weather code
- `getWeatherDescription()`: Returns readable weather description

## 🎯 Weather Codes

The dashboard interprets WMO weather codes:
- **0-1**: Clear sky / Mainly clear
- **2**: Partly cloudy
- **3**: Overcast
- **45-48**: Foggy
- **51-82**: Drizzle / Rain / Showers
- **71-86**: Snow / Snow showers
- **95-99**: Thunderstorm variants

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📱 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🌐 Default Location

The dashboard defaults to **Pune, India** on first load. You can search for any location worldwide to change it.

## ⚡ Performance

- **Fast Load Times**: Optimized with Vite
- **Minimal Bundle**: Tree-shaking removes unused code
- **Responsive**: CSS animations and transitions
- **Real-Time**: Instant updates on location search

## 🛡️ Error Handling

- Network error handling for API calls
- Invalid location detection
- Loading states during data fetch
- User-friendly error messages

## 📝 License

This project is open source and available under the MIT License.

## 🙋 Support

For questions or issues:
1. Check the browser console for error messages
2. Ensure you have internet connectivity (required for API calls)
3. Try searching with a different location name
4. Clear browser cache and reload

## 🌟 Future Enhancements

- Hourly forecast
- Weather alerts and warnings
- Multiple location tracking
- Dark/Light theme toggle
- Weather history graphs
- Air quality index (AQI)
- Sunrise/sunset times
- Local storage for favorite locations

---

**Made with ❤️ using React, Vite, and Tailwind CSS**
