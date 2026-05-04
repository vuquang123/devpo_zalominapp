import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { featuredProducts } from "@/constants/featured-products";
import { ASSETS } from "@/constants/assets";
import { openChat } from "zmp-sdk/apis";

const FILTERS = ["Tất cả", "iPhone Lock", "iPhone Quốc tế", "iPad"];
const ITEMS_PER_PAGE = 8;

function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}

export default function MenuPage() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState(
    location.state?.activeFilter || "Tất cả"
  );
  const [activePage, setActivePage] = useState(1);

  // Automatically update filter if navigated from home page shortcuts
  useEffect(() => {
    if (location.state?.activeFilter) {
      setActiveFilter(location.state.activeFilter);
      setActivePage(1);
    }
  }, [location.state]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "Tất cả") return featuredProducts;
    const term = activeFilter.toLowerCase();
    return featuredProducts.filter((p) => 
      p.meta.toLowerCase().includes(term) || 
      p.name.toLowerCase().includes(term)
    );
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const visibleProducts = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, activePage]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setActivePage(1);
  };

  const handleChat = async (productName: string) => {
    try {
      await openChat({
        type: "oa",
        id: "4289073059490896771",
        message: `Chào shop, mình quan tâm đến sản phẩm: ${productName}. Tư vấn giúp mình nhé!`,
      });
    } catch (error) {
      console.log("Error opening chat", error);
    }
  };

  return (
    <div className="bg-[#3a3a3c] min-h-screen w-full relative z-10 pointer-events-auto overflow-y-auto">
      <div className="px-2 pb-5 pt-2">
        {/* Filter Bar */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-hide px-1 mt-1 relative z-20">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFilterClick(f)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-[20px] text-[13px] font-semibold border transition-colors cursor-pointer ${
                activeFilter === f 
                  ? "bg-[#1c1c1e] text-white border-[#1c1c1e] shadow-sm" 
                  : "bg-white text-[#1c1c1e] border-[#e5e5ea] active:bg-gray-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-white text-sm opacity-60">Không có sản phẩm nào phù hợp</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-2">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="relative bg-[#f4f5f9] pt-8 pb-3 px-2 flex flex-col items-center justify-center">
                {product.badge && (
                  <div className="absolute left-0 top-0 z-10 rounded-br-lg rounded-tl-xl px-2 py-1 text-[10px] font-bold text-white shadow-sm bg-black">
                    {product.badge}
                  </div>
                )}
                
                {/* DEV PO logo text at top center */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3.5 flex items-center justify-center mix-blend-multiply opacity-80">
                  <img src={ASSETS.LOGO} alt="Dev Pồ" className="h-full object-contain" />
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-28 w-full object-contain mt-1"
                  draggable={false}
                />
              </div>

              <div className="flex flex-1 flex-col p-3">
                <div className="text-[13px] font-bold text-[#1c1c1e] leading-tight">
                  {product.name}
                </div>
                <div className="text-[10px] text-[#8e8e93] mt-1 line-clamp-1">
                  {product.meta}
                </div>
                
                <div className="mt-2.5 text-[14px] font-bold text-black leading-none">
                  {product.price}
                </div>
                <div className="text-[11px] text-[#8e8e93] line-through mt-1 leading-none">
                  {product.oldPrice || "\u00A0"}
                </div>

                <div className="my-2.5 border-b border-[#f2f2f7]" />

                <div className="flex flex-col gap-1.5 mb-3 flex-1">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-[10px] text-[#636366] leading-tight truncate">{spec}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-full bg-[#1c1c1e] py-1.5 text-[12px] font-semibold text-white active:bg-[#2c2c2e]"
                  onClick={() => handleChat(product.name)}
                >
                  <ChatIcon />
                  Nhắn Zalo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 mb-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setActivePage(p)}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
                  activePage === p
                    ? "bg-white text-black shadow-sm"
                    : "bg-[#2c2c2e] text-[#8e8e93] border border-[#3a3a3c] active:bg-[#4a4a4c]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
