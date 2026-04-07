import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import { getBasePath } from "./utils/zma";
import { copy } from "@/constants/copy";

// Lazy loading pages
const HomePage = lazy(() => import("./pages/home"));
const MenuPage = lazy(() => import("./pages/menu"));
const OrderPage = lazy(() => import("./pages/order"));
const ProfilePage = lazy(() => import("./pages/profile"));
const SearchPage = lazy(() => import("./pages/search"));
const ProductDetailPage = lazy(() => import("./pages/product-detail"));
const CheckoutPage = lazy(() => import("./pages/checkout"));
const SelectLocationPage = lazy(() => import("./pages/select-location"));
const OrderSuccessPage = lazy(() => import("./pages/order-success"));
const OrderDetailPage = lazy(() => import("./pages/order-detail"));
const LuckyWheelPage = lazy(() => import("./pages/lucky-wheel"));

// Loading fallback component
const PageFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue500 border-t-transparent"></div>
  </div>
);

const withSuspense = (Component: React.ElementType) => (
  <Suspense fallback={<PageFallback />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: withSuspense(HomePage) },
        { path: "/menu", element: withSuspense(MenuPage) },
        {
          path: "/order",
          element: withSuspense(OrderPage),
          handle: {
            hideCart: true,
          },
        },
        {
          path: "/profile",
          element: withSuspense(ProfilePage),
          handle: {
            whiteBackground: true,
            hideHeader: true,
            hideCart: true,
          },
        },
        { path: "/menu/search", element: withSuspense(SearchPage) },
        {
          path: "/lucky-wheel",
          element: withSuspense(LuckyWheelPage),
          handle: {
            whiteBackground: true,
            hideHeader: true,
            hideCart: true,
          },
        },
        {
          path: "/product/:id",
          element: withSuspense(ProductDetailPage),
          handle: {
            whiteBackground: true,
            hideFooter: true,
            hideHeader: true,
          },
        },
        {
          path: "/checkout",
          element: withSuspense(CheckoutPage),
          handle: {
            title: copy.header.delivery,
            back: true,
            whiteBackground: true,
            hideFooter: true,
            headerPosition: "sticky",
          },
        },
        {
          path: "/select-location",
          element: withSuspense(SelectLocationPage),
          handle: {
            back: true,
            title: copy.header.selectLocation,
            hideFooter: true,
            headerPosition: "sticky",
            whiteBackground: true,
            hideHeader: true,
          },
        },
        {
          path: "/order-success",
          element: withSuspense(OrderSuccessPage),
          handle: {
            title: copy.header.confirmation,
            whiteBackground: true,
            hideFooter: true,
          },
        },
        {
          path: "/order/:orderId",
          element: withSuspense(OrderDetailPage),
          handle: {
            title: " ",
            back: true,
            whiteBackground: true,
            hideFooter: true,
            headerPosition: "sticky",
            hideCart: true,
          },
        },
      ],
    },
  ],
  {
    basename: getBasePath(),
  },
);

export default router;
