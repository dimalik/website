"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

// Page-level image registry
const imageRegistry: { src: string; alt: string }[] = [];
let openLightbox: ((index: number) => void) | null = null;

function LightboxOverlay({
  images,
  index,
  onClose,
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c < images.length - 1 ? c + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  const img = images[current];
  const showNav = images.length > 1;

  return createPortal(
    <span
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      {showNav && (
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl cursor-pointer select-none z-10"
          onClick={(e) => { e.stopPropagation(); prev(); }}
        >
          ‹
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        className="max-w-full max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      {showNav && (
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl cursor-pointer select-none z-10"
          onClick={(e) => { e.stopPropagation(); next(); }}
        >
          ›
        </span>
      )}
      <span className="absolute bottom-4 text-white/70 text-sm text-center max-w-2xl px-4">
        {img.alt && !img.alt.startsWith("img") && (
          <span className="block mb-1">{img.alt}</span>
        )}
        <span className="text-white/40">{current + 1} / {images.length}</span>
      </span>
    </span>,
    document.body
  );
}

export function ImageLightbox(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const indexRef = useRef(-1);
  const caption = props.alt && props.alt !== "" && !props.alt.startsWith("img") ? props.alt : null;

  useEffect(() => {
    const entry = { src: String(props.src ?? ""), alt: props.alt ?? "" };
    imageRegistry.push(entry);
    indexRef.current = imageRegistry.length - 1;

    return () => {
      const idx = imageRegistry.indexOf(entry);
      if (idx !== -1) imageRegistry.splice(idx, 1);
    };
  }, [props.src, props.alt]);

  useEffect(() => {
    if (!openLightbox) {
      openLightbox = (i: number) => {
        setOverlayOpen(true);
      };
    }
  }, []);

  function handleOpen() {
    setOverlayOpen(true);
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-lg my-6 cursor-zoom-in"
        alt={props.alt ?? ""}
        {...props}
        onClick={handleOpen}
      />
      {caption && (
        <span className="block text-center text-sm text-gray-500 dark:text-gray-400 -mt-4 mb-6">
          {caption}
        </span>
      )}
      {overlayOpen && (
        <LightboxOverlay
          images={[...imageRegistry]}
          index={indexRef.current}
          onClose={() => setOverlayOpen(false)}
        />
      )}
    </>
  );
}
