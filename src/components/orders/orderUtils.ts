export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
};

