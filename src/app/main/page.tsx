'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MainPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Team IMPACT Hub
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose how you'd like to continue
          </p>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Already have an account?</CardTitle>
              <CardDescription>
                Sign in to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleLogin}
                className="w-full"
                size="lg"
              >
                Log In
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New to Team IMPACT Hub?</CardTitle>
              <CardDescription>
                Create an account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSignUp}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Sign Up
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
