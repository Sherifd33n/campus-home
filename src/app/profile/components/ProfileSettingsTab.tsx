import React, { useState } from "react";
import { toast } from "sonner";
import { IoSave, IoSettings } from "react-icons/io5";
import { UserProfile } from "@/context/AuthContext";

interface ProfileSettingsTabProps {
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
}

const ProfileSettingsTab: React.FC<ProfileSettingsTabProps> = ({
  user,
  updateUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    university: user.university || "",
    image: user.image || (null as string | null),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel — reset form to current user values
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        university: user.university || "",
        image: user.image || null,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <div className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 lg:p-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
          Profile Settings
        </h2>
        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
            isEditing
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-[#278cf1] text-white hover:bg-[#1e74cc]"
          }`}>
          {isEditing ? (
            <>
              <IoSave /> Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </button>
      </div>

      <div className="p-6 lg:p-8 space-y-8">
        {/* Profile Photo */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-50">
          <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative group">
            {formData.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={formData.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-400">
                {formData.name.charAt(0)}
              </span>
            )}
            {isEditing && (
              <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <IoSettings className="text-white text-xl animate-spin-slow" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-gray-900 text-lg">Profile Photo</h3>
            <p className="text-xs text-gray-500">
              {isEditing
                ? "Click the photo to upload a new one"
                : "This is how you appear to others"}
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border transition-all ${
                isEditing
                  ? "border-blue-200 bg-blue-50/30 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1]"
                  : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <p className="text-[10px] text-gray-400">
              Email cannot be changed.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border transition-all ${
                isEditing
                  ? "border-blue-200 bg-blue-50/30 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1]"
                  : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              University/Institution
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border transition-all ${
                isEditing
                  ? "border-blue-200 bg-blue-50/30 focus:border-[#278cf1] focus:ring-1 focus:ring-[#278cf1]"
                  : "border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-all">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-all shadow-md shadow-green-100">
              Confirm Changes
            </button>
          </div>
        )}

        {/* Privacy & Security */}
        <div className="pt-8 border-t border-gray-50">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Privacy &amp; Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p className="font-bold text-gray-800 text-sm">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-gray-500">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <button className="text-[#278cf1] text-xs font-bold hover:underline">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl border border-red-50">
              <div>
                <p className="font-bold text-red-600 text-sm">Delete Account</p>
                <p className="text-xs text-red-400">
                  Permanently remove your account and all data.
                </p>
              </div>
              <button className="text-red-500 text-xs font-bold hover:underline">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsTab;
