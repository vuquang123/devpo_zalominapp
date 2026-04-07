import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse rounded-xl bg-white p-3 shadow-sm">
      <div className="h-32 w-full rounded-lg bg-neutral100" />
      <div className="mt-3 h-4 w-3/4 rounded bg-neutral100" />
      <div className="mt-2 h-3 w-1/2 rounded bg-neutral100" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-5 w-1/3 rounded bg-neutral100" />
        <div className="h-5 w-5 rounded-full bg-neutral100" />
      </div>
    </div>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse h-full bg-background">
      <div className="h-[360px] w-full bg-neutral100" />
      <div className="bg-white p-4">
        <div className="h-6 w-1/2 rounded bg-neutral100" />
        <div className="mt-3 h-4 w-full rounded bg-neutral100" />
        <div className="mt-2 h-4 w-3/4 rounded bg-neutral100" />
      </div>
      <div className="m-3 h-40 rounded-lg bg-white" />
      <div className="m-3 h-20 rounded-lg bg-white" />
    </div>
  );
};
