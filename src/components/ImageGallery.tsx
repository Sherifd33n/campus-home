"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ImageGalleryProps {
  images: string[];
  hostelName: string;
}

const PLACEHOLDER = "/images/menu-image.jpg";

const ImageGallery = ({ images, hostelName }: ImageGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[300px] md:h-[400px] mb-8">
        {/* Main Image */}

        <div
          className="md:col-span-2 relative h-full rounded-2xl md:rounded-l-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
          onClick={() => openModal(0)}>
          <Image
            src={images[0] || PLACEHOLDER}
            alt={hostelName}
            fill
            className="object-cover"
            priority
          />

          {/* Mobile Overlay */}
          {images.length > 1 && (
            <div className="absolute inset-0 md:hidden bg-black/40 flex items-center justify-center text-white">
              <span className="text-2xl font-semibold">
                +{images.length - 1}
              </span>
            </div>
          )}
        </div>

        {/* Middle Stack */}
        <div className="hidden md:grid grid-rows-2 col-span-1 gap-3 h-full">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="relative overflow-hidden shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => openModal(idx)}>
              <Image
                src={images[idx] || images[0] || PLACEHOLDER}
                alt={`${hostelName} view ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* End Image */}
        <div
          className="hidden md:block relative h-full rounded-r-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
          onClick={() => openModal(3)}>
          <Image
            src={images[3] || images[0] || PLACEHOLDER}
            alt={`${hostelName} view 4`}
            fill
            className="object-cover"
          />
          {images.length > 4 && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
              <span className="text-2xl font-semibold">
                +{images.length - 4}
              </span>
              <span className="text-sm font-medium tracking-wider">
                View All Images
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center"
            onClick={closeModal}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-110 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
              aria-label="Close">
              <FaXmark size={24} />
            </button>

            {/* Counter */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 md:left-8 z-110 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors"
                  aria-label="Previous image">
                  <FaChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 md:right-8 z-110 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors"
                  aria-label="Next image">
                  <FaChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl h-[70vh] px-4"
              onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[currentIndex] || PLACEHOLDER}
                alt={`${hostelName} fullscreen view`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
