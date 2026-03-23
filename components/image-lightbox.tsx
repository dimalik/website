"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

export function ImageLightbox(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false);
  const caption = props.alt && props.alt !== "" && !props.alt.startsWith("img") ? props.alt : null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-lg my-6 cursor-zoom-in"
        alt={props.alt ?? ""}
        {...props}
        onClick={() => setOpen(true)}
      />
      {caption && (
        <span className="block text-center text-sm text-gray-500 dark:text-gray-400 -mt-4 mb-6">
          {caption}
        </span>
      )}
      {open &&
        createPortal(
          <span
            role="dialog"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
            onClick={() => setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.src}
              alt={props.alt ?? ""}
              className="max-w-full max-h-full object-contain"
            />
          </span>,
          document.body
        )}
    </>
  );
}
