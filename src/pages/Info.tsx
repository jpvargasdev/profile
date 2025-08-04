import { useEffect, useState } from "react";
import { MinimalNav } from "../components/MinimalNav";

const Info = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        // Using counter.dev as external visit counter service
        const response = await fetch('https://api.counter.dev/hit?id=juanvargas-portfolio&format=json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setVisitCount(data.count || 1);
        } else {
          // Fallback to local storage counter
          const localCount = parseInt(localStorage.getItem('visit-count') || '1');
          localStorage.setItem('visit-count', (localCount + 1).toString());
          setVisitCount(localCount + 1);
        }
      } catch (error) {
        console.error('Failed to fetch visit count:', error);
        // Fallback to local storage counter
        const localCount = parseInt(localStorage.getItem('visit-count') || '1');
        localStorage.setItem('visit-count', (localCount + 1).toString());
        setVisitCount(localCount + 1);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitCount();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <MinimalNav activeSection="info" onNavigate={() => {}} />
      
      <main className="flex items-center justify-center min-h-screen pt-20">
        <div className="text-center space-y-8 px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Site Info
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Total page visits
            </p>
            
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white">
              {loading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              ) : (
                <span className="text-3xl font-bold">
                  {visitCount?.toLocaleString() || '---'}
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              This counter tracks total visits across all pages. 
              Data is provided by counter.dev with localStorage fallback.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Info;