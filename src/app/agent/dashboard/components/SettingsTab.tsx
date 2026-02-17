import React from "react";
import { toast } from "sonner";
import { IoPencil } from "react-icons/io5";

interface SettingsTabProps {
  profile: {
    name: string;
    agency: string;
    phone: string;
    email: string;
    image: string | null;
  };
  setProfile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      agency: string;
      phone: string;
      email: string;
      image: string | null;
    }>
  >;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ profile, setProfile }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Agency Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Profile saved!");
        }}
        className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative group">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-gray-400">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
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
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Profile Photo</h3>
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

        <button
          type="submit"
          className="w-full px-4 py-3 rounded-xl bg-[#278cf1] text-white font-bold shadow-lg shadow-blue-500/20">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
