"use client";

import { useEffect, useState, useCallback } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DEBOUNCE_MS = 300;

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search articles by title, description, or content...",
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  const debouncedOnChange = useCallback(
    (newValue: string) => {
      const timer = setTimeout(() => {
        onChange(newValue);
      }, DEBOUNCE_MS);
      return () => clearTimeout(timer);
    },
    [onChange]
  );

  useEffect(() => {
    const cleanup = debouncedOnChange(localValue);
    return cleanup;
  }, [localValue, debouncedOnChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search articles
      </label>
      <input
        id="search"
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 pr-10 text-zinc-900 placeholder-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1"
        aria-label="Search articles by title, description, or content"
        autoComplete="off"
      />
      <svg
        className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
