"use client"

import { memo } from 'react';

const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
});

export default LoadingSpinner;
