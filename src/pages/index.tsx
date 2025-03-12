// src/pages/index.tsx
import React from 'react';
import Layout from '../components/layout/Layout';
import FilterBar from '../components/dashboard/FilterBar';
import StatsCards from '../components/dashboard/StatsCards';
import EventAttendanceChart from '../components/dashboard/EventAttendanceChart';
import TopEmployees from '../components/dashboard/TopEmployees';
import EmployeeActivityCharts from '../components/dashboard/EmployeeActivityCharts';

export default function Home() {
  return (
    <Layout>
      <FilterBar />
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EventAttendanceChart />
        </div>
        <div>
          <TopEmployees />
        </div>
      </div>
      <EmployeeActivityCharts />
    </Layout>
  );
}
