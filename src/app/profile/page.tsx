'use client';

import { useState, useEffect } from 'react';
import { ProfileForm } from '@/components/Profile/ProfileForm';
import { User } from '@/lib/types';
import { formatRole } from '@/lib/utils';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/me?userId=alumni_01');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = (updatedUser: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updatedUser } : null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-12">No user found.</div>;
  }

  return (
    <div className="bg-[#f3f6f8] pb-12">
      {/* Cover Image */}
      <div className="relative w-full h-56 bg-blue-200 flex items-center justify-center">
        <img src="/file.svg" alt="cover" className="object-contain w-full h-full" />
        {/* Profile Picture overlay */}
        <div className="absolute left-1/2 top-36 transform -translate-x-1/2 flex items-center justify-center" style={{ width: 140, height: 140 }}>
          <img src={user.avatarUrl ?? ''} alt={user.name} className="w-32 h-32 object-contain rounded-full" />
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg mt-[-70px] p-8 relative z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-1 text-blue-900 drop-shadow-lg" style={{textShadow: '0 2px 8px #fff'}}>{user.name}</h1>
          <p className="text-lg text-gray-700 mb-2">{user.bio}</p>
          <p className="text-sm text-gray-500 mb-2">{formatRole(user.role)} &bull; {user.location?.city}, {user.location?.state}</p>
          <div className="flex gap-2 mt-2">
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">+ Follow</a>
            <a href="#" className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold">Message</a>
            <button className="bg-gray-100 px-4 py-2 rounded font-semibold">...</button>
          </div>
        </div>
        <hr className="my-6" />
        {/* Contact Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Info</h2>
          <ul className="space-y-2 text-sm">
            {user.linkedin && (
              <li>
                <span className="font-medium">LinkedIn: </span>
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.linkedin}</a>
              </li>
            )}
            {user.email && (
              <li>
                <span className="font-medium">Email: </span>
                <span>{user.email}</span>
              </li>
            )}
            {user.phone && (
              <li>
                <span className="font-medium">Phone: </span>
                <span>{user.phone}</span>
              </li>
            )}
          </ul>
        </div>
        <hr className="my-6" />
        {/* Overview Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            Team IMPACT is a 501(c)3 national nonprofit that connects children facing serious or chronic illnesses with college athletic teams, forming lifelong bonds and life-changing outcomes. Team IMPACT is a 2021 FOS “Best Employers in Sports” winner, a certified “Great Place to Work”, and is currently ranked 100 ... see more
          </p>
        </div>
      </div>
    </div>
  );
}
