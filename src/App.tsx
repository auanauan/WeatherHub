import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LocationProvider } from '@/contexts/LocationContext';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Locations } from '@/pages/Locations';
import { Compare } from '@/pages/Compare';

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="locations" element={<Locations />} />
              <Route path="compare" element={<Compare />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
