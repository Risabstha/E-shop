import React, { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { ErrorBoundary } from "react-error-boundary";
import Home from "../pages/Home";

import MyOrderMain from "../pages/User/MyOrderMain";
import WishlistMain from "../pages/User/WishlistMain";
import AddressMain from "../pages/User/AddressMain";
import AccountSecurityMain from "../pages/User/AccountSecurityMain";
import MyAccountMain from "../pages/User/MyAccountMain";
import UserEdit from "../components/userCompnents/UserEdit";
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));


// resetErrorBoundry
function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="pt-16">
      <div className="max-w-md mx-auto  p-6 border-2 border-red-500 rounded-lg bg-red-100 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-xl font-bold text-red-700 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

const AppRouter: React.FC = () => {
  const [retryKey, setRetryKey] = useState(0);
  console.log("retryKey:", retryKey);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        </ErrorBoundary>
      ),
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setRetryKey((prev) => prev + 1)}
        >
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        </ErrorBoundary>
      ),
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setRetryKey((prev) => prev + 1)}
        >
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        </ErrorBoundary>
      ),
      errorElement: <Error />,
    },
     {
          path: "/myaccount",
          element: (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Loader />}>
                <MyAccountMain />
              </Suspense>
            </ErrorBoundary>
          ),
          children : [{
          path: "/myaccount/useredit",
          element: (
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => setRetryKey((prev) => prev + 1)}
            >
              <Suspense fallback={<Loader />}>
                <UserEdit/>
              </Suspense>
            </ErrorBoundary>
          ),
          errorElement: <Error />,
        },]
        },
        {
          path: "/security",
          element: (
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => setRetryKey((prev) => prev + 1)}
            >
              <Suspense fallback={<Loader />}>
                <AccountSecurityMain />
              </Suspense>
            </ErrorBoundary>
          ),
          errorElement: <Error />,
        },
        {
          path: "/address",
          element: (
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => setRetryKey((prev) => prev + 1)}
            >
              <Suspense fallback={<Loader />}>
                <AddressMain />
              </Suspense>
            </ErrorBoundary>
          ),
          errorElement: <Error />,
        },
        {
          path: "/wishlist",
          element: (
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => setRetryKey((prev) => prev + 1)}
            >
              <Suspense fallback={<Loader />}>
                <WishlistMain />
              </Suspense>
            </ErrorBoundary>
          ),
          errorElement: <Error />,
        },
        {
          path: "/orders",
          element: (
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => setRetryKey((prev) => prev + 1)}
            >
              <Suspense fallback={<Loader />}>
                <MyOrderMain/>
              </Suspense>
            </ErrorBoundary>
          ),
          errorElement: <Error />,
        },
         
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
