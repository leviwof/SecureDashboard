import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboardData } from '../services/dashboard';
import { DashboardItem } from '../types';
import DashboardCard from '../components/DashboardCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardData();
        
        if (response.success && response.data) {
          setDashboardItems(response.data);
        } else {
          setError(response.error || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('An unexpected error occurred while fetching dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
        <p className="font-medium">Error loading dashboard</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.email}</h1>
        <p className="text-gray-600 mt-1">Here's your encrypted dashboard data</p>
      </div>

      {dashboardItems.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-4 rounded-lg">
          <p>No dashboard items found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => (
            <DashboardCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;