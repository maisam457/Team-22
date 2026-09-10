'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const INTERESTS = [
  'Music',
  'Video Games',
  'Movies',
  'Sports',
  'Reading',
  'Cooking',
  'Travel',
  'Photography',
  'Art & Design',
  'Technology',
  'Fitness',
  'Dancing',
  'Gaming',
  'Fashion',
  'Nature & Hiking',
  'Crafts & DIY',
  'Comedy',
  'Science',
  'History',
  'Languages'
];

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(item => item !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedInterests.length < 5) {
      return;
    }

    setIsLoading(true);
    
    // Simulate a brief loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Redirect to login page
    router.push('/login');
  };

  const isSelected = (interest: string) => selectedInterests.includes(interest);
  const canContinue = selectedInterests.length >= 5;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What are your interests?
          </h2>
          <p className="mt-3 text-lg text-gray-700">
            Select at least 5 interests to help us personalize your experience
          </p>
          <p className="mt-2 text-sm text-gray-600 font-medium">
            {selectedInterests.length}/5 minimum selected
          </p>
        </div>
        
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-6 py-4 text-sm font-semibold rounded-full border-2 transition-all duration-300 transform hover:scale-105 ${
                      isSelected(interest)
                        ? 'border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl scale-105'
                        : 'border-gray-300 bg-white/80 text-gray-700 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              
              <div className="pt-6">
                <Button 
                  onClick={handleContinue}
                  className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    canContinue 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!canContinue || isLoading}
                >
                  {isLoading ? 'Processing...' : `Continue (${selectedInterests.length} selected)`}
                </Button>
                
                {!canContinue && (
                  <p className="mt-3 text-sm text-red-500 text-center font-medium">
                    Please select at least 5 interests to continue
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
