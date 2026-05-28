import React, { createContext, useState, useContext, ReactNode } from 'react';
import { type Order } from '@/components/orders/OrderCard';

interface BookingModalContextType {
  isModalOpen: boolean;
  modalMode: 'book' | 'reschedule';
  orderToReschedule: Order | null;
  openModal: (mode?: 'book' | 'reschedule', order?: Order | null) => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export const BookingModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'book' | 'reschedule'>('book');
  const [orderToReschedule, setOrderToReschedule] = useState<Order | null>(null);

  const openModal = (mode: 'book' | 'reschedule' = 'book', order: Order | null = null) => {
    setModalMode(mode);
    setOrderToReschedule(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode('book');
    setOrderToReschedule(null);
  };

  return (
    <BookingModalContext.Provider value={{ isModalOpen, modalMode, orderToReschedule, openModal, closeModal }}>
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
};
