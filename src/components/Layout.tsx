'use client';

import { ReactNode, useState } from 'react';
import { SideModal } from './ui/sideModal';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isSignUpPage = pathname === '/signup';
  const isMainPage = pathname === '/main';
  const isInterestsPage = pathname === '/interests';

  // All hooks must be called before any conditional returns
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsletter, setNewsletter] = useState<string>("");
  const [loading, setLoading] = useState(false);

  if (isLoginPage || isSignUpPage || isMainPage || isInterestsPage) {
    return <>{children}</>;
  }

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setLoading(true);
    
    try {
      // Call the newsletter API that uses OpenAI
      const response = await fetch('/api/newsletter', {
        method: 'GET',
      });
      
      if (response.ok) {
        const data = await response.json();
        setNewsletter(data.newsletter);
      } else {
        // Fallback in case of API error
        setNewsletter('Failed to generate newsletter. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching newsletter:', error);
      setNewsletter('Failed to generate newsletter. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Topbar />
      <div className="flex pt-14 sm:pt-16">
        <Sidebar />
        <main className="flex-1 ml-0 lg:ml-72 pb-16 lg:pb-0 overflow-x-hidden">
          <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-8 w-full">
            {children}
          </div>
        </main>
      </div>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
            pathname === '/' ? 'text-blue-600' : 'text-slate-600'
          }`}>
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs font-medium">Feed</span>
          </Link>
          <Link href="/messages" className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
            pathname === '/messages' ? 'text-blue-600' : 'text-slate-600'
          }`}>
            <span className="text-xl mb-1">💬</span>
            <span className="text-xs font-medium">Messages</span>
          </Link>
          <Link href="/profile" className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
            pathname === '/profile' ? 'text-blue-600' : 'text-slate-600'
          }`}>
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </Link>
          <Link href="/donations" className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
            pathname === '/donations' ? 'text-blue-600' : 'text-slate-600'
          }`}>
            <span className="text-xl mb-1">💰</span>
            <span className="text-xs font-medium">Donate</span>
          </Link>
        </div>
      </div>

      {/* Newsletter Button - fixed bottom right, hidden on mobile */}
      <div className="hidden sm:block fixed bottom-4 right-4 z-50">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition flex items-center gap-2"
          onClick={handleOpenModal}
        >
          <span>View this month's newsletter</span>
          <span role="img" aria-label="sparkle">✨</span>
        </button>
      </div>
      <SideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
          This Month's Newsletter <span role="img" aria-label="sparkle">✨</span>
        </h2>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
              <span className="text-4xl">✨</span>
            </div>
            <div className="mt-4 text-blue-500 font-semibold text-lg">Generating your AI newsletter...</div>
          </div>
        ) : (
          <>
            <div className="whitespace-pre-line text-gray-800 text-lg leading-relaxed mb-6">
              {newsletter}
            </div>
            {/* Share section at bottom of modal */}
            <div className="mt-8 flex gap-3 flex-wrap items-center justify-center">
              <span className="font-semibold text-gray-600 mr-2">Share:</span>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded shadow hover:bg-red-600 transition flex items-center gap-2"
                onClick={() => {
                  const subject = encodeURIComponent("Team IMPACT Hub Newsletter");
                  const body = encodeURIComponent(newsletter);
                  window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, "_blank");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm-16 12V8.99l8 6.99 8-6.99V18H4z"/></svg>
                Gmail
              </button>
              <button
                className="bg-blue-700 text-white px-3 py-2 rounded shadow hover:bg-blue-800 transition flex items-center gap-2"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(newsletter);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, "_blank");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-3v-10h3v1.5c.41-.59 1.36-1.5 2.5-1.5 1.93 0 3.5 1.57 3.5 3.5v6.5z"/></svg>
                LinkedIn
              </button>
              <button
                className="bg-gray-600 text-white px-3 py-2 rounded shadow hover:bg-gray-700 transition flex items-center gap-2"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: "Team IMPACT Hub Newsletter", text: newsletter, url: window.location.href });
                  } else {
                    alert("Sharing is not supported on this device.");
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.13c.05-.25.09-.5.09-.77s-.03-.52-.09-.77l7.09-4.11c.54.5 1.25.81 2.01.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .27.04.52.09.77l-7.09 4.11c-.54-.5-1.25-.81-2.01-.81-1.66 0-3 1.34-3 3s1.34 3 3 3c.76 0 1.47-.31 2-.8l7.13 4.13c-.05.23-.08.47-.08.72 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/></svg>
                More
              </button>
            </div>
          </>
        )}
      </SideModal>
    </div>
  );
}
