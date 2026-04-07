import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ReactQueryProvider } from "./lib/react-query-provider";
import React from "react";
import { SnackbarProvider } from "zmp-ui";
import ErrorBoundary from "./components/common/error-boundary";

export default function MiniApp() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <SnackbarProvider>
          <ReactQueryProvider>
            <RouterProvider router={router} />
          </ReactQueryProvider>
        </SnackbarProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
