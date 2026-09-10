import React from "react";

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
  <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
  <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 shadow-2xl rounded-l-3xl p-8 w-full max-w-xl h-full overflow-y-auto relative animate-slide-in pointer-events-auto">
        <button
          className="absolute top-4 right-6 text-blue-500 hover:text-blue-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </div>
  );
};
