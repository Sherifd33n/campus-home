"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { institutions } from "@/data/listing";

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
    { type: string; price: string; availability: string }[]
  >([{ type: "Single Room", price: "", availability: "AVAILABLE" }]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Profile State
  const [profile, setProfile] = useState<{
    name: string;
    agency: string;
    phone: string;
    email: string;
    image: string | null;
  }>({
    name: "Sheriff Jamiu",
    agency: "Premium Properties Ltd",
    phone: "+234 812 345 6789",
    email: "jamiu.sherif@example.com",
    image: null,
  });

  // Filtered Schools derived from formData.state
  const filteredSchools = React.useMemo(() => {
    if (!formData.state) return [];
    return institutions.filter((inst) => inst.stateId === formData.state);
  }, [formData.state]);

  // Listings State
  const [activeListings, setActiveListings] = useState<Listing[]>([
    {
      id: "1",
      name: "Sunshine Premium Hostel",
      location: "Unilorin, Ilorin",
      state: "kwara",
      schoolId: "unilorin",
      price: "₦250,000",
      status: "Active",
      about: "A premium student residence with modern facilities.",
      gender: "Mixed",
      distanceToCampus: "5 mins walk",
      amenities: ["WiFi", "24/7 Power", "Security"],
      images: ["/images/hostels/hostel1.png"],
      rooms: [
        { type: "Single Room", price: "250000", availability: "AVAILABLE" },
      ],
      policies: {
        utilitiesIncluded: true,
        refundableDeposit: true,
        noHiddenFees: true,
      },
    },
    {
      id: "2",
      name: "Green View Apartment",
      location: "Kwasu, Malete",
      state: "kwara",
      schoolId: "kwasu",
      price: "₦180,000",
      status: "Pending",
      about: "Comfortable and affordable living for students.",
      gender: "Female Only",
      distanceToCampus: "10 mins walk",
      amenities: ["Water Supply", "Security"],
      images: ["/images/hostels/hostel2.png"],
      rooms: [
        { type: "2-Bed Shared", price: "180000", availability: "AVAILABLE" },
      ],
      policies: {
        utilitiesIncluded: false,
        refundableDeposit: true,
        noHiddenFees: true,
      },
    },
  ]);

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      studentName: "Sarah Johnson",
      property: "Sunny Side Apt",
      message: "Is this still available? I'd like to schedule a viewing.",
      email: "sarah.j@example.com",
      phone: "+234 801 234 5678",
      date: "2 hours ago",
      status: "new",
    },
    {
      id: "2",
      studentName: "Mike Peters",
      property: "Student Haven",
      message: "What's the deposit fee for this unit?",
      email: "mike.p@example.com",
      phone: "+234 809 876 5432",
      date: "5 hours ago",
      status: "new",
    },
    {
      id: "3",
      studentName: "Jessica Lee",
      property: "Campus Villa",
      message: "Are pets allowed in the compound?",
      email: "jessica.l@example.com",
      phone: "+234 812 345 6789",
      date: "1 day ago",
      status: "contacted",
    },
  ]);

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
        schoolId: editingProperty.schoolId,
        price: editingProperty.price.replace("₦", "").replace(/,/g, ""),
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
        { type: "Single Room", price: "", availability: "AVAILABLE" },
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (selectedImages.length >= 5) {
        toast.error("Maximum 5 images allowed");
        return;
      }
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setSelectedImages((prev) => [...prev, ...newImages].slice(0, 5));
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

    const school = institutions.find((i) => i.id === formData.schoolId);
    const location = school
      ? `${school.name}, ${formData.state}`
      : formData.state;
    // Calculate starting price from rooms (min price)
    const minPrice =
      propertyRooms.length > 0
        ? Math.min(...propertyRooms.map((r) => parseInt(r.price) || 0))
        : 0;
    const formattedPrice = `₦${minPrice.toLocaleString()}`;

    const newListing: Listing = {
      id: editingProperty?.id || crypto.randomUUID(),
      ...formData,
      location,
      price: formattedPrice,
      status: "Pending", // Default to pending for new/edited
      amenities: selectedAmenities,
      images: selectedImages,
      rooms: propertyRooms,
      policies: {
        utilitiesIncluded: true,
        refundableDeposit: true,
        noHiddenFees: true,
      },
    };

    if (editingProperty) {
      setActiveListings((prev) =>
        prev.map((l) => (l.id === editingProperty.id ? newListing : l)),
      );
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
      setActiveListings((prev) => [newListing, ...prev]);
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

  const handleDelete = React.useCallback((id: string) => {
    toast("Delete this listing?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          const activityId = crypto.randomUUID();
          setActiveListings((prev) => prev.filter((l) => l.id !== id));
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
  }, []);

  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: status } : l)),
    );
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
          isViewModalOpen={isViewModalOpen}
          setIsViewModalOpen={setIsViewModalOpen}
          viewingProperty={viewingProperty}
        />

        <LeadDetailsModal
          viewingLead={viewingLead}
          setViewingLead={setViewingLead}
          updateLeadStatus={updateLeadStatus}
        />
      </AnimatePresence>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />

      <main className="flex-1 lg:ml-64 relative">
        <TopBar
          profile={profile}
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
              <SettingsTab profile={profile} setProfile={setProfile} />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
