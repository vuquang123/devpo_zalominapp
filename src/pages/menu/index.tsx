import { useMemo, useState } from "react";
import { featuredProducts } from "@/constants/featured-products";

const ITEMS_PER_PAGE = 8;
const PRODUCT_FILTERS = ["Tất cả", "iPhone", "iPad"] as const;
type ProductFilter = (typeof PRODUCT_FILTERS)[number];

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M7 7.5H17C18.9 7.5 20.5 9.1 20.5 11V12.8C20.5 14.7 18.9 16.3 17 16.3H12.7L9.2 18.8V16.3H7C5.1 16.3 3.5 14.7 3.5 12.8V11C3.5 9.1 5.1 7.5 7 7.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MenuPage() {
  const [activePage, setActivePage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<ProductFilter>("Tất cả");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "Tất cả") return featuredProducts;

    return featuredProducts.filter((product) =>
      product.name.toLowerCase().includes(activeFilter.toLowerCase()),
    );
  }, [activeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  const visibleProducts = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [activePage, filteredProducts]);

  return (
    <div className="px-3.5 pb-5 pt-2">
      <div className="rounded-2xl bg-white px-3 pb-4 pt-3 shadow-sm">
        <div className="text-center text-xxlarge-m uppercase text-text-primary">
          SẢN PHẨM NỔI BẬT
        </div>
        <div className="mt-2 text-center text-small text-text-secondary">
          Các dòng máy nguyên zin, chất lượng cao tại DEV PỒ
        </div>
        <div className="text-center text-small text-text-secondary">
          Danh sách được tối ưu cho Zalo Simulator (che do static).
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {PRODUCT_FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setActivePage(1);
                }}
                className={`rounded-full px-4 py-1.5 text-small-m ${
                  isActive
                    ? "bg-neutral900 text-white"
                    : "border border-divider01 bg-white text-text-secondary"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-divider01 bg-white"
            >
              <div className="relative bg-[#ECEFF4]">
                {product.badge && (
                  <div className="absolute left-2 top-2 rounded-full bg-red500 px-2 py-0.5 text-xxsmall-m text-white">
                    {product.badge}
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-36 w-full object-contain px-2 py-3"
                  draggable={false}
                />
              </div>

              <div className="flex flex-1 flex-col p-2.5">
                <div className="min-h-[48px] text-large-sb text-text-primary">
                  {product.name}
                </div>
                <div className="mt-0.5 min-h-[32px] text-xsmall text-text-secondary">
                  {product.meta}
                </div>
                <div className="mt-2 text-xlarge-sb text-red500">{product.price}</div>
                <div className="text-small text-text-disabled line-through">
                  {product.oldPrice}
                </div>

                <div className="my-2 border-b border-divider01" />

                <div className="min-h-[40px] space-y-1 text-xsmall text-text-secondary">
                  {product.specs.map((spec) => (
                    <div key={`${product.id}-${spec}`}>✓ {spec}</div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-neutral900 py-2 text-small-m text-white"
                >
                  <ChatIcon />
                  Nhắn Zalo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-text-primary">
          <button
            type="button"
            className="h-8 w-8 rounded-lg border border-transparent text-large disabled:text-text-disabled"
            onClick={() => setActivePage((page) => Math.max(1, page - 1))}
            disabled={activePage === 1}
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === activePage;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`h-8 min-w-8 rounded-lg px-2 text-small-m ${
                  isActive
                    ? "border border-divider01 bg-white text-text-primary"
                    : "text-text-primary"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            className="h-8 w-8 rounded-lg border border-transparent text-large disabled:text-text-disabled"
            onClick={() => setActivePage((page) => Math.min(totalPages, page + 1))}
            disabled={activePage === totalPages}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
