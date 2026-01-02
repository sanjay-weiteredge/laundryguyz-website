export const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
    case 'completed':
      return 'bg-green-500';
    case 'confirmed':
    case 'picked_up':
    case 'processing':
    case 'ready_for_delivery':
    case 'out_for_delivery':
    case 'in-progress':
      return 'bg-blue-500';
    case 'pending':
      return 'bg-yellow-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'completed':
      return 'Completed';
    case 'confirmed':
      return 'Confirmed';
    case 'picked_up':
      return 'Picked Up';
    case 'processing':
      return 'Processing';
    case 'ready_for_delivery':
      return 'Ready for Delivery';
    case 'out_for_delivery':
      return 'Out for Delivery';
    case 'in-progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  }
};

// Check if order can be cancelled (only pending or confirmed)
export const canCancelOrder = (status: string): boolean => {
  return ['pending', 'confirmed'].includes(status);
};

// Check if order can be rescheduled (only pending or confirmed)
export const canRescheduleOrder = (status: string): boolean => {
  return ['pending', 'confirmed'].includes(status);
};

