"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function ArticleModal({ post, onClose }: ArticleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (post) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [post]);

  useEffect(() => {
    if (!post) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [post, onClose]);

  useEffect(() => {
    if (!post || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    if (firstFocusable) firstFocusable.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusables = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      const lastIndex = focusables.length - 1;
      const currentIndex = focusables.indexOf(document.activeElement as HTMLElement);

      if (e.shiftKey) {
        if (currentIndex <= 0) {
          e.preventDefault();
          focusables[lastIndex].focus();
        }
      } else {
        if (currentIndex >= lastIndex) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [post]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
          aria-label="Close modal"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <article className="p-6 pb-8">
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg bg-zinc-100">
            <Image
              src={post.photo_url}
              alt={`Cover image for: ${post.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              priority
            />
          </div>

          <span className="mb-2 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
            {post.category}
          </span>

          <h2
            id="modal-title"
            className="mb-2 text-2xl font-bold text-zinc-900"
          >
            {post.title}
          </h2>

          <time
            dateTime={post.created_at}
            className="mb-6 block text-sm text-zinc-500"
          >
            {formatDate(post.created_at)}
          </time>

          <div
            id="modal-description"
            className="prose prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </div>
    </div>
  );
}
