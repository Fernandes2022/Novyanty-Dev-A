'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log performance metrics (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance:', metric.name, metric.value);
    }
    
    // In production, you can send to analytics
    // analytics.track(metric.name, metric.value);
  });

  return null;
}
