import { DashboardItem, ApiResponse } from '../types';

// Mock function to get dashboard data (simulating NoSQL DB fetch)
export const getDashboardData = async (): Promise<ApiResponse<DashboardItem[]>> => {
  try {
    // In a real app, this would make an actual API call to a NoSQL database
    // For this example, we'll return mock data
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: [
        {
          id: '1',
          title: 'Welcome to your Dashboard',
          description: 'This is your first dashboard item. You can view this because you are authenticated.',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Financial Report - Q2 2025',
          description: 'Quarterly financial summary showing growth trends and projections.',
          timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        },
        {
          id: '3',
          title: 'New Product Launch',
          description: 'Details about upcoming product releases and marketing strategy.',
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error fetching dashboard data',
    };
  }
};