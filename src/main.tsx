import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import './index.css';
import DoctorDetails from './pages/DoctorDetails';
import DrugDetails from './pages/DrugDetails';
import ManufacturerDetails from './pages/ManufacturerDetails';
import StateDetails from './pages/StateDetails';
import { NavFoot } from './components/NavFoot';
import DoctorReviews from './pages/DoctorReviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavFoot>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='doctor/:id' element={<DoctorDetails />} />
          <Route path='doctor/:id/reviews' element={<DoctorReviews />} />
          <Route path='drug/:id' element={<DrugDetails />} />
          <Route path='manufacturer/:id' element={<ManufacturerDetails />} />
          <Route path='state/:id' element={<StateDetails />} />
        </Routes>
      </NavFoot>
    </BrowserRouter>
  </React.StrictMode>
);
