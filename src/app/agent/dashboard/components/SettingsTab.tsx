import React, { useState } from "react";
import { IoPencil } from "react-icons/io5";

interface SettingsTabProps {
  initialData: {
    name: string;
    agency: string;
    phone: string;
    email: string;
    image: string | null;
  };
  onSave: (data: {
    name: string;
    agency: string;
    phone: string;
    email: string;
    image: string | null;
  }) => void;
  onReset: () => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  initialData,
  onSave,
  onReset,
}) => {
  const [profile, setProfile] = useState(initialData);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
        Agency Profile
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(profile);
        }}
        className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 mb-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative group">
              {profile.image && (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
              {!profile.image && (
                <span className="text-xl sm:text-2xl font-bold text-gray-400">
                  {profile.name
                    ? profile.name
                        .split(" ")
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join("")
                    : "A"}
                </span>
              )}
              <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <IoPencil className="text-white text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfile((prev) => ({
                          ...prev,
                          image: reader.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                Profile Photo
              </h3>
              <p className="text-xs text-gray-500">
                Click to upload a new photo
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">
              Agency Name
            </label>
            <input
              value={profile.agency}
              onChange={(e) =>
                setProfile({ ...profile, agency: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">
              Phone Number
            </label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-1">
              Email Address
            </label>
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-[#278cf1] text-white font-bold shadow-lg shadow-blue-500/20">
            Save Changes
          </button>

          <div className="pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-red-600 mb-2">Danger Zone</h4>
            <p className="text-xs text-gray-500 mb-4">
              If your browser storage is full or the platform seems stuck, you
              can reset all property data to defaults.
            </p>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure? This will delete all your local listings and reset the platform to defaults.",
                  )
                ) {
                  onReset();
                }
              }}
              className="w-full px-4 py-3 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-colors">
              Reset Platform Data
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsTab;
