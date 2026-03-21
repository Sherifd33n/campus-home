import React from "react";
import { IoDocumentTextOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { UserDocument } from "@/context/AuthContext";

interface DocumentsTabProps {
  documents: UserDocument[];
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ documents }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tenancy Documents</h2>
        <p className="text-xs text-gray-400 italic">
          Manage your receipts and agreements
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-[#278cf1]/30 transition-all group shadow-sm hover:shadow-md">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-[#278cf1] transition-all">
                  <IoDocumentTextOutline size={28} />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer bg-gray-50 rounded-full">
                  <IoCloudDownloadOutline size={22} />
                </button>
              </div>
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  {doc.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  {doc.hostelName}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {doc.date}
                </span>
                {doc.amount && (
                  <span className="text-base font-bold text-gray-900">
                    {doc.amount}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 bg-white py-20 px-6 rounded-3xl border border-dashed border-gray-200 text-center">
            <IoDocumentTextOutline
              size={48}
              className="mx-auto text-gray-200 mb-4"
            />
            <p className="text-gray-400 font-medium">
              No documents available yet.
            </p>
            <p className="text-[10px] text-gray-400 mt-2">
              Documents are generated automatically after a successful booking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsTab;
