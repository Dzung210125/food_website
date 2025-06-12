'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Edit2, Camera, X } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the profile content to ensure it only runs on client side
const ProfileContent = dynamic(() => Promise.resolve(({ session }: { session: any }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.image) {
      setProfileImage(session.user.image);
    }
  }, [session]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-32 bg-orange-500">
            <div className="absolute -bottom-16 left-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                {profileImage ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, 128px"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera size={32} className="text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 p-2 bg-orange-500 text-white rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                  <Camera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {session.user?.name || 'User Name'}
                </h1>
                <p className="text-gray-600">{session.user?.email}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                <Edit2 className="h-5 w-5" />
              </button>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{session.user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">+1 (234) 567-8900</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">123 Food Street, Cuisine City</p>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    className="p-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">Order #{order}</p>
                        <p className="text-sm text-gray-500">March {order}, 2024</p>
                      </div>
                      <span className="px-3 py-1 text-sm font-medium text-orange-500 bg-orange-50 rounded-full">
                        Delivered
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}), { ssr: false });

// Wrap the page component with a client-side only wrapper
const ProfilePageWrapper = dynamic(() => Promise.resolve(() => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <ProfileContent session={session} />;
}), { ssr: false });

export default function ProfilePage() {
  return <ProfilePageWrapper />;
} 