"use client";

import { useState } from "react";

export function ImageLightbox(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-lg my-6 cursor-zoom-in"
        alt={props.alt ?? ""}
        {...props}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={props.src}
            alt={props.alt ?? ""}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}
