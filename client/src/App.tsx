import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  } from "react-router-dom";
import Login from "./auth/Login";
import MainLayout from "./MainLayout";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import { useUserStore } from "./zustand/useUserStore";
import { useEffect } from "react";
import InitialLoadingPage from "./components/InitialLoadingPage";
import OrderStatus from "./components/Success";
import UserOrders from "./components/UserOrders";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isVerified } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  
  if (!isVerified) {
    return <Navigate to={"/verify-email"} replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isVerified } = useUserStore();
  if (isAuthenticated && isVerified) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }
  if (!user?.admin) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
        {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetailsPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      
      {
        path: "/orders",
        element: <UserOrders/>,
      },
      {
        path: "/order/status",
        element: <OrderStatus/>,
      },
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menus",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <SignUp />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: (
      <AuthenticatedUser>
        <VerifyEmail />
      </AuthenticatedUser>
    ),
  },
]);

const App = () => {
  const { isCheckingAuth, checkAuthentication } = useUserStore();
  // checking auth everytime when page loaded
  useEffect(() => {
    (async () => {
      try {
        await checkAuthentication();
      } catch (error) {
        console.log(error);
        <Navigate to={"/login"} />;
      }
    })();
  }, [checkAuthentication]);
  if (isCheckingAuth) {
    return <InitialLoadingPage />;
  }
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
