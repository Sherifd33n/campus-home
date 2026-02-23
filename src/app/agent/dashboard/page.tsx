"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth, UserProfile, Inquiry } from "@/context/AuthContext";
import { useHostels } from "@/context/HostelContext";
import { institutions } from "@/data/listing";
import { Hostel } from "@/data/hostel";
import { fileToBase64, compressImage } from "@/lib/image-utils";

// Components
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import OverviewTab from "./components/OverviewTab";
import ListingsTab from "./components/ListingsTab";
import LeadsTab from "./components/LeadsTab";
import AnalyticsTab from "./components/AnalyticsTab";
import SettingsTab from "./components/SettingsTab";
import ListingModal from "./components/ListingModal";
import ViewListingModal from "./components/ViewListingModal";
import LeadDetailsModal from "./components/LeadDetailsModal";
import { Listing, Lead, Activity } from "./types";

const AgentDashboard = () => {
  const router = useRouter();
  const { user, updateUser, inquiries, updateInquiryStatus, replyToInquiry } =
    useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeLeadTab, setActiveLeadTab] = useState<
    "new" | "contacted" | "archived"
  >("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Listing | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Listing | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    schoolId: "",
    price: "",
    about: "",
    gender: "Mixed",
    distanceToCampus: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [propertyRooms, setPropertyRooms] = useState<
    { type: string; price: number; availability: string }[]
  >([{ type: "Single Room", price: 0, availability: "AVAILABLE" }]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Filtered Schools derived from formData.state
  const filteredSchools = React.useMemo(() => {
    if (!formData.state) return [];
    return institutions.filter((inst) => inst.stateId === formData.state);
  }, [formData.state]);

  const school = React.useMemo(() => {
    return institutions.find((i) => i.id === formData.schoolId);
  }, [formData.schoolId]);

  // Listings from HostelContext
  const { hostels, addHostel, updateHostel, deleteHostel, resetHostels } =
    useHostels();

  const activeListings = React.useMemo(() => {
    if (!user) return [];
    return hostels.filter(
      (h) => h.agentName.toLowerCase() === user.name.toLowerCase(),
    );
  }, [hostels, user]);

  // Leads State
  // Transform real inquiries into Dashboard Leads
  const leads = React.useMemo(() => {
    if (!user) return [];

    return inquiries
      .filter((inq) => inq.agent.toLowerCase() === user.name.toLowerCase())
      .map((inq) => {
        let status: Lead["status"] = "new";
        if (["Replied", "Contacted"].includes(inq.status)) status = "contacted";
        if (["Closed", "Archived"].includes(inq.status)) status = "archived";

        return {
          id: inq.id.toString(),
          studentName: inq.studentName,
          property: inq.property,
          message: inq.message || `Interested in ${inq.property}`,
          email: inq.studentEmail,
          phone: inq.studentPhone || "Not provided",
          date: inq.date,
          status,
          agentReply: inq.agentReply,
        };
      });
  }, [inquiries, user]);

  // Mock Analytics Data
  const analyticsData = [
    { name: "Mon", views: 40, clicks: 24, leads: 2 },
    { name: "Tue", views: 30, clicks: 13, leads: 1 },
    { name: "Wed", views: 20, clicks: 58, leads: 5 },
    { name: "Thu", views: 27, clicks: 39, leads: 3 },
    { name: "Fri", views: 18, clicks: 48, leads: 4 },
    { name: "Sat", views: 23, clicks: 38, leads: 3 },
    { name: "Sun", views: 34, clicks: 43, leads: 4 },
  ];

  const topListingsData = [
    { name: "Sunny Side Apt", views: 120 },
    { name: "Student Haven", views: 98 },
    { name: "Campus Villa", views: 86 },
  ];

  // Activity Log
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      text: "New lead from John Doe",
      time: "2 mins ago",
      type: "lead",
    },
    {
      id: "2",
      text: "Property 'Sunshine Premium' viewed 50 times",
      time: "1 hour ago",
      type: "stat",
    },
    {
      id: "3",
      text: "Listing 'Royal Court' marked as active",
      time: "5 hours ago",
      type: "update",
    },
  ]);

  // Effect to populate form when editing
  React.useEffect(() => {
    if (editingProperty) {
      setFormData({
        name: editingProperty.name,
        state: editingProperty.state,
        schoolId: editingProperty.schoolSlug, // Mapping schoolSlug to schoolId for form
        price: editingProperty.rooms[0].price.toString(),
        about: editingProperty.about,
        gender: editingProperty.gender,
        distanceToCampus: editingProperty.distanceToCampus,
      });
      setSelectedAmenities(editingProperty.amenities);
      setPropertyRooms(editingProperty.rooms);
      setSelectedImages(editingProperty.images);
    } else {
      // Reset form
      setFormData({
        name: "",
        state: "",
        schoolId: "",
        price: "",
        about: "",
        gender: "Mixed",
        distanceToCampus: "",
      });
      setSelectedAmenities([]);
      setPropertyRooms([
        { type: "Single Room", price: 0, availability: "AVAILABLE" },
      ]);
      setSelectedImages([]);
    }
  }, [editingProperty, isPropertyModalOpen]);

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (selectedImages.length >= 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }

      const files = Array.from(e.target.files);
      const remainingSlots = 5 - selectedImages.length;
      const filesToProcess = files.slice(0, remainingSlots);

      const loadingToast = toast.loading("Processing images...");

      try {
        const processedImages = await Promise.all(
          filesToProcess.map(async (file) => {
            const base64 = await fileToBase64(file);
            return await compressImage(base64);
          }),
        );

        setSelectedImages((prev) => [...prev, ...processedImages]);
        toast.dismiss(loadingToast);
        toast.success("Images uploaded successfully");
      } catch (error) {
        console.error("Image processing failed", error);
        toast.dismiss(loadingToast);
        toast.error("Failed to process some images");
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.state || !formData.schoolId) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedImages.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    // Calculate starting price from rooms (min price)
    const minPrice =
      propertyRooms.length > 0
        ? Math.min(...propertyRooms.map((r) => r.price || 0))
        : 0;

    const newHostel: Hostel = {
      id: editingProperty?.id || `hostel-${crypto.randomUUID()}`,
      slug:
        (editingProperty as Hostel)?.slug ||
        `${formData.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: formData.name,
      address: formData.name, // Using name as address for now if not provided
      city: school?.city || "Campus Area",
      state: formData.state,
      country: "Nigeria",
      distanceToCampus: formData.distanceToCampus,
      verified: false,
      agentVerified: true,
      inspectionCompleted: false,
      gender: formData.gender,
      totalUnits: 0,
      schoolSlug: school?.schoolSlug || "",
      rating: 0,
      reviews: 0,
      startingPrice: minPrice,
      images: selectedImages,
      amenities: selectedAmenities,
      rooms: propertyRooms,
      utilitiesIncluded: true,
      refundableDeposit: true,
      noHiddenFees: true,
      featured: false,
      about: formData.about,
      agentName: user?.name || "Unknown Agent",
      createdAt: new Date().toISOString(),
    };

    if (editingProperty) {
      updateHostel(editingProperty.id, newHostel);
      toast.success("Listing updated successfully");
      const activityId = crypto.randomUUID();
      setActivities((prev) => [
        {
          id: activityId,
          text: `Updated listing '${formData.name}'`,
          time: "Just now",
          type: "update",
        },
        ...prev,
      ]);
    } else {
      addHostel(newHostel);
      toast.success("New listing added successfully");
      const activityId = crypto.randomUUID();
      setActivities((prev) => [
        {
          id: activityId,
          text: `Added new listing '${formData.name}'`,
          time: "Just now",
          type: "update",
        },
        ...prev,
      ]);
    }

    setIsPropertyModalOpen(false);
    setEditingProperty(null);
  };

  const handleUpdateProfile = (updatedProfile: Partial<UserProfile>) => {
    updateUser(updatedProfile);
    toast.success("Profile updated successfully");
  };

  const handleDelete = React.useCallback(
    (id: string) => {
      toast("Delete this listing?", {
        description: "This action cannot be undone.",
        action: {
          label: "Delete",
          onClick: () => {
            const activityId = crypto.randomUUID();
            deleteHostel(id);
            setActivities((prev) => [
              {
                id: activityId,
                text: "Deleted a listing",
                time: "Just now",
                type: "update",
              },
              ...prev,
            ]);
            toast.success("Listing deleted successfully");
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
      });
    },
    [deleteHostel],
  );

  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    // Map Lead status back to Inquiry status
    let inqStatus: Inquiry["status"] = "Pending";
    if (status === "contacted") inqStatus = "Contacted";
    if (status === "archived") inqStatus = "Archived";

    updateInquiryStatus(parseInt(id), inqStatus);

    if (status === "contacted") toast.success("Marked as contacted");
    if (status === "archived") toast.success("Lead archived");
    setViewingLead(null);
  };

  const handleLogout = React.useCallback(() => {
    router.push("/");
  }, [router]);

  // Stats Logic
  const stats = [
    {
      label: "Total Views",
      value: "1,284",
      icon: <span className="text-xl">📊</span>,
      color: "bg-blue-500",
    },
    {
      label: "Active Listings",
      value: activeListings.length.toString(),
      icon: <span className="text-xl">🏠</span>,
      color: "bg-green-500",
    },
    {
      label: "Student Leads",
      value: leads.filter((l) => l.status === "new").length.toString(),
      icon: <span className="text-xl">👥</span>,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-roboto">
      {/* Modals */}
      <AnimatePresence>
        <ListingModal
          key="listing-modal"
          isPropertyModalOpen={isPropertyModalOpen}
          setIsPropertyModalOpen={setIsPropertyModalOpen}
          editingProperty={editingProperty}
          handleSaveProperty={handleSaveProperty}
          formData={formData}
          handleInputChange={handleInputChange}
          filteredSchools={filteredSchools}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          selectedImages={selectedImages}
          removeImage={removeImage}
          handleImageUpload={handleImageUpload}
          propertyRooms={propertyRooms}
          setPropertyRooms={setPropertyRooms}
        />

        <ViewListingModal
          key="view-listing-modal"
          isViewModalOpen={isViewModalOpen}
          setIsViewModalOpen={setIsViewModalOpen}
          viewingProperty={viewingProperty}
        />

        <LeadDetailsModal
          key="lead-details-modal"
          viewingLead={viewingLead}
          setViewingLead={setViewingLead}
          updateLeadStatus={updateLeadStatus}
          replyToInquiry={replyToInquiry}
        />
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden">
              <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
                onClose={() => setIsMobileMenuOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        className="fixed hidden lg:flex"
      />

      <main className="flex-1 lg:ml-64 relative">
        <TopBar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
          activeTab={activeTab}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            {activeTab === "overview" && (
              <OverviewTab stats={stats} activities={activities} />
            )}

            {activeTab === "listings" && (
              <ListingsTab
                listings={activeListings}
                setEditingProperty={setEditingProperty}
                setIsPropertyModalOpen={setIsPropertyModalOpen}
                handleDelete={handleDelete}
                setViewingProperty={setViewingProperty}
                setIsViewModalOpen={setIsViewModalOpen}
              />
            )}

            {activeTab === "leads" && (
              <LeadsTab
                leads={leads}
                activeLeadTab={activeLeadTab}
                setActiveLeadTab={setActiveLeadTab}
                setViewingLead={setViewingLead}
                updateLeadStatus={updateLeadStatus}
              />
            )}

            {activeTab === "analytics" && (
              <AnalyticsTab
                analyticsData={analyticsData}
                topListingsData={topListingsData}
                leads={leads}
              />
            )}

            {activeTab === "settings" && (
              <SettingsTab
                initialData={{
                  name: user?.name || "",
                  agency: user?.agency || "",
                  phone: user?.phone || "",
                  email: user?.email || "",
                  image: user?.image || null,
                }}
                onSave={handleUpdateProfile}
                onReset={resetHostels}
              />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
