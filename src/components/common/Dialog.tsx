
import React from 'react';
import { Portal } from 'react-portal';
import { FocusTrap } from 'focus-trap-react';

interface DialogProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ title, children, onClose }) => {
  return (
    <Portal>
      <FocusTrap>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-2xl font-medium text-white font-montserrat">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
};

export default Dialog;
