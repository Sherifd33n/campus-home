"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { institutions } from "@/data/listing";
import type { Institution } from "@/types/listing";

interface UniversityAutocompleteProps {
  value: string; // the display value (what the user typed)
  onChange: (value: string) => void; // raw text input change
  onSelect: (institution: Institution) => void; // user picked a suggestion
  onClear: () => void;
  error?: string;
}

const MAX_SUGGESTIONS = 7;

const UniversityAutocomplete: React.FC<UniversityAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  onClear,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  // Filter suggestions
  const suggestions: Institution[] =
    value.trim().length > 0
      ? institutions
          .filter(
            (inst) =>
              inst.name.toLowerCase().includes(value.toLowerCase()) ||
              inst.shortName.toLowerCase().includes(value.toLowerCase()) ||
              inst.city.toLowerCase().includes(value.toLowerCase()),
          )
          .slice(0, MAX_SUGGESTIONS)
      : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      setOpen(true);
      setActiveIndex(-1);
    },
    [onChange],
  );

  const handleSelect = useCallback(
    (inst: Institution) => {
      onSelect(inst);
      setOpen(false);
      setActiveIndex(-1);
    },
    [onSelect],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // Highlight matched portion of text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold text-[#278cf1]">
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-2 flex-1 min-w-0">
      <FaGraduationCap size={20} className="text-[#278cf1] shrink-0" />
      <div className="flex flex-col gap-0.5 items-start min-w-0 w-full">
        <p className="text-[10px] font-semibold text-gray-600">UNIVERSITY</p>
        <div className="relative flex items-center w-full">
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="e.g. University of Ilorin"
            className="text-gray-700 text-sm outline-none w-full bg-transparent pr-5"
            value={value}
            onChange={handleInputChange}
            onFocus={() => value.trim().length > 0 && setOpen(true)}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-expanded={open && suggestions.length > 0}
            role="combobox"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onClear();
                setOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-0 text-gray-300 hover:text-gray-500 transition-colors"
              aria-label="Clear university">
              <IoCloseCircle size={16} />
            </button>
          )}
        </div>
        {error && <p className="text-[10px] text-red-500 mt-0.5">{error}</p>}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <ul
          id={listboxId}
          ref={listRef}
          role="listbox"
          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 py-1 max-h-64 overflow-y-auto">
          {suggestions.map((inst, idx) => (
            <li
              key={inst.id}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(inst);
              }}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                idx === activeIndex ? "bg-blue-50" : "hover:bg-gray-50"
              }`}>
              {/* Icon */}
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <FaGraduationCap className="text-[#278cf1] text-sm" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-800 leading-tight truncate">
                  {highlightMatch(inst.name, value)}
                </p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {inst.shortName} · {inst.city}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* No results hint */}
      {open && value.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 px-4 py-4 text-center">
          <p className="text-sm text-gray-400">No university found for</p>
          <p className="text-sm font-bold text-gray-600 mt-0.5 truncate">
            &ldquo;{value}&rdquo;
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            Try the full name or abbreviation (e.g. UNILAG)
          </p>
        </div>
      )}
    </div>
  );
};

export default UniversityAutocomplete;
