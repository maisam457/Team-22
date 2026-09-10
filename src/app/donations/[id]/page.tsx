'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Globe, 
  Lock, 
  Share2, 
  Copy, 
  ExternalLink,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { DonationEventDTO } from '@/lib/types';

export default function DonationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [donation, setDonation] = useState<DonationEventDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchDonation(params.id as string);
    }
  }, [params.id]);

  const fetchDonation = async (id: string) => {
    try {
      const response = await fetch(`/api/donations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setDonation(data);
      } else {
        console.error('Failed to fetch donation');
        router.push('/donations');
      }
    } catch (error) {
      console.error('Error fetching donation:', error);
      router.push('/donations');
    } finally {
      setLoading(false);
    }
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const shareDonation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: donation?.title,
          text: donation?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyLink();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Donation not found</h2>
          <Button 
            onClick={() => router.push('/donations')}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Donations
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = 0; // Will be updated when payment integration is added

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/donations')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Donations
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donation Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                      {donation.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        {donation.visibility === 'public' ? (
                          <Globe className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <Lock className="h-4 w-4 mr-1 text-gray-400" />
                        )}
                        <span className="capitalize">{donation.visibility}</span>
                      </div>
                      {donation.allowComments && (
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>Comments enabled</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {donation.description && (
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {donation.description}
                  </p>
                )}

                {donation.beneficiary && (
                  <div className="flex items-center mb-4">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">
                      <strong>Beneficiary:</strong> {donation.beneficiary}
                    </span>
                  </div>
                )}

                {donation.tags && donation.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {donation.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(0, donation.currency)} of {formatCurrency(donation.goalAmountCents, donation.currency)}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1">
                    {progressPercentage}% of goal reached
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => window.open(donation.externalPaymentUrl, '_blank')}
                    className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Donate Now
                  </Button>
                  <Button
                    onClick={shareDonation}
                    variant="outline"
                    className="flex-1 border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    onClick={copyLink}
                    variant="outline"
                    className="flex-1 border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Donation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Goal Amount</span>
                  <span className="font-semibold">
                    {formatCurrency(donation.goalAmountCents, donation.currency)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Currency</span>
                  <span className="font-semibold">{donation.currency}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <span className="text-sm">{formatDate(donation.startAt)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">End Date</span>
                  <span className="text-sm">{formatDate(donation.endAt)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm">{formatDate(donation.createdAt)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  This donation event uses external payment processing for secure transactions.
                </p>
                <Button
                  onClick={() => window.open(donation.externalPaymentUrl, '_blank')}
                  variant="outline"
                  className="w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transform hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Payment Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
