import { ProfileForm } from '@/components/Profile/ProfileForm';
import { User } from '@/lib/types';
import { formatRole } from '@/lib/utils';

interface ProfilePageProps {
  params: { id: string };
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  // Fetch user data by ID
  // Use mock data for Sarah Johnson
  let user: User | null = null;
  if (params.id === 'alumni_01') {
    user = {
      id: 'alumni_01',
      name: 'Sarah Johnson',
      bio: 'Mentor, STEM advocate, and baseball enthusiast. Connect with me for community impact!',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      role: 'ALUMNI',
      location: { city: 'Boston', state: 'MA' },
      tags: [
        { id: 'stem', label: 'STEM', type: 'INTEREST' },
        { id: 'baseball', label: 'Baseball', type: 'INTEREST' },
        { id: 'basketball', label: 'Basketball', type: 'INTEREST' }
      ],
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      followers: 8000,
      employees: '11-50',
      followingIds: [],
    };
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f6f8] pb-12">
      {/* Cover Image */}
      <div className="relative w-full h-56 bg-blue-200 flex items-center justify-center">
  <img src="/file.svg" alt="cover" className="object-contain w-full h-full" />
        {/* Profile Picture overlay */}
        <div className="absolute left-1/2 top-36 transform -translate-x-1/2 flex items-center justify-center" style={{ width: 140, height: 140 }}>
          <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 object-contain rounded-full" />
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg mt-[-70px] p-8 relative z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-1 text-gray-900">{user.name}</h1>
          <p className="text-lg text-gray-700 mb-2">{user.bio}</p>
          <p className="text-sm text-gray-500 mb-2">{formatRole(user.role)} &bull; {user.location?.city}, {user.location?.state}</p>
          <p className="text-sm text-gray-500 mb-2">Followers: {user.followers} &bull; Employees: {user.employees}</p>
          <div className="flex gap-2 mt-2">
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">+ Follow</a>
            <a href="#" className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold">Message</a>
            <button className="bg-gray-100 px-4 py-2 rounded font-semibold">...</button>
          </div>
        </div>
        <hr className="my-6" />
            {/* Contact Info Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
                  <span className="font-semibold text-gray-800">Email:</span>
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>
                  <span className="font-semibold text-gray-800">Phone:</span>
                  <span className="text-gray-700">{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v.01" /></svg>
                  <span className="font-semibold text-gray-800">LinkedIn:</span>
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{user.linkedin}</a>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-9h3v1.268c.591-.859 1.553-1.268 2.5-1.268 1.933 0 3.5 1.567 3.5 3.5v5.5z"/></svg>
                  Update Profile Based on LinkedIn
                </button>
              </div>
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
