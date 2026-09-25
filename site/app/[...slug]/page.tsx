import type { Metadata } from "next";
import Link from "next/link";
import { BookingDialog, DemoNotice, Header } from "@/components/client";

// This remodel is the homepage only. Any other address under /bates lands here instead of a 404.
export const metadata: Metadata = { title: "Not part of the demo | Bates Landscaping" };

export default function DemoOnly() {
  return (
    <>
      <Header />
      <main className="grid min-h-[100dvh] place-items-center bg-paper px-4 pb-16 pt-28 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em]">
            This page isn&apos;t part of the demo
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-moss">
            This concept remodel of the Bates Landscaping website covers the homepage only.
          </p>
          <Link
            href="/"
            className="press mt-7 inline-flex rounded-full bg-red px-5 py-3 text-[15px] font-semibold text-white hover:bg-red-deep"
          >
            Back to the homepage
          </Link>
        </div>
      </main>
      <DemoNotice />
      <BookingDialog />
    </>
  );
}
