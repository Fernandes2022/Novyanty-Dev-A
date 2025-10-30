'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const generateVideos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate-testimonials', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('Failed to generate videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generate Video Testimonials</h1>
        
        <button
          onClick={generateVideos}
          disabled={loading}
          className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating Videos... (This will take 10-30 minutes)' : 'Generate All 6 Videos'}
        </button>

        {loading && (
          <div className="mt-8 p-4 bg-blue-900/50 rounded-lg">
            <p className="font-bold mb-2">⏳ Generating videos...</p>
            <p className="text-sm text-gray-300">This process takes 2-5 minutes per video. Please keep this page open.</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-900/50 rounded-lg">
            <p className="font-bold">❌ Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-green-400">✅ Videos Generated!</h2>
            
            <div className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-96">
              <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
            </div>

            <div className="space-y-4">
              {results.testimonials?.map((testimonial: any) => (
                <div key={testimonial.id} className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="font-bold">{testimonial.author}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.location}</p>
                  <p className="text-sm mt-2">Rating: {testimonial.rating}★</p>
                  <a 
                    href={testimonial.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline text-sm"
                  >
                    View Video →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
