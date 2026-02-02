import React from 'react';

export const TrustSignals: React.FC = () => {
  return (
    <div className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="material-icons-round text-green-400">verified</span>
          </div>
          <p className="text-xs font-bold text-white">FSSAI Certified</p>
        </div>
        <div>
          <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="material-icons-round text-blue-400">schedule</span>
          </div>
          <p className="text-xs font-bold text-white">On-Time Delivery</p>
        </div>
        <div>
          <div className="bg-yellow-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="material-icons-round text-yellow-400">star</span>
          </div>
          <p className="text-xs font-bold text-white">4.9★ Rating</p>
        </div>
      </div>
    </div>
  );
};