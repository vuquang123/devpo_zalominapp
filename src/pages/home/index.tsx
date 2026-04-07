import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/common/search-bar";
import HomeBanner from "./components/HomeBanner";
import Highlights from "./components/Highlights";
import QuickActions from "./components/QuickActions";
import ServiceCards from "./components/ServiceCards";
import OAFollow from "./components/OAFollow";
import TrustMarquee from "./components/TrustMarquee";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="no-scrollbar h-full overflow-y-auto pb-6">
      <div className="mb-4 flex flex-col gap-4">
        {/* Banner Section */}
        <HomeBanner />

        {/* Highlights Section */}
        <Highlights />

        {/* Search Section */}
        <div className="mx-3.5">
          <SearchBar onClick={() => navigate("/menu/search")} />
        </div>

        {/* Quick Actions Section */}
        <QuickActions />

        {/* Service Cards Section */}
        <ServiceCards />

        {/* OA Follow Section */}
        <OAFollow />
      </div>

      {/* Trust Marquee Section */}
      <TrustMarquee />
    </div>
  );
}
