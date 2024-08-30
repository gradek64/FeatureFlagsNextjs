'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const Modal = ({children}:{children:React.ReactNode}) => {
  const router = useRouter();

  // Function to close the modal and go back to the home route
  const handleCloseModal = () => {
    router.push('/');
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto p-6 relative">
        
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#10005; {/* Close Icon */}
        </button>
     
        {children}
        
      </div>
    </div>
  );
};

export default Modal;
