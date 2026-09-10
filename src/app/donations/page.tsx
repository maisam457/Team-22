'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Calendar, DollarSign, Users, Globe, Lock } from 'lucide-react';
import { DonationEventDTO } from '@/lib/types';
import { CreateDonationModal } from '@/components/Donations/CreateDonationModal';

export default function DonationsPage() {
  const [donations, setDonations] = useState<DonationEventDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations');
      if (response.ok) {
        const data = await response.json();
        setDonations(data.donations || []);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonationCreated = (donation: DonationEventDTO) => {
    setDonations(prev => [donation, ...prev]);
    setShowCreateModal(false);
  };

  const formatCurrency = (amountCents: number, currency: string) => {
    const amount = amountCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
            <p className="text-gray-600 mt-2">Support our community through meaningful donations</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl active:shadow-md transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Donation
          </Button>
        </div>

        {/* Donations Grid */}
        {donations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <DollarSign className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No donations yet</h3>
              <p className="text-gray-600 mb-6">Be the first to create a donation event for our community.</p>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Donation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <Card key={donation.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {donation.title}
                    </CardTitle>
                    <div className="flex items-center ml-2">
                      {donation.visibility === 'public' ? (
                        <Globe className="h-4 w-4 text-green-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donation.description && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {donation.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold">
                          {formatCurrency(donation.goalAmountCents, donation.currency)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(donation.startAt)}</span>
                      </div>
                    </div>

                    {donation.beneficiary && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{donation.beneficiary}</span>
                      </div>
                    )}

                    {donation.tags && donation.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {donation.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      <Button
                        onClick={() => window.location.href = `/donations/${donation.id}`}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Donation Modal */}
      {showCreateModal && (
        <CreateDonationModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleDonationCreated}
        />
      )}
    </div>
  );
}
