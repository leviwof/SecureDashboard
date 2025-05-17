import { DashboardItem } from '../types';

interface DashboardCardProps {
  item: DashboardItem;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ item }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-3">{item.description}</p>
      <div className="text-sm text-gray-500">
        {formatDate(item.timestamp)}
      </div>
    </div>
  );
};

export default DashboardCard;