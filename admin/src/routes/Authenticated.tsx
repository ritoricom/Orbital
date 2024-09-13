import { FC, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useAuthentication } from "@/lib/authentication";
import { Layout } from "@/ui/layout";
import { isNonNullable } from "@/utils/eq";
import { getDefaultRouteByRole } from "@/features/auth";
import { ProtectedRouteInner } from "./ProtectedRouteInner";

const Users = lazy(() =>
  import("@/features/users/routes/Users").then((mod) => ({
    default: mod.Users,
  }))
);
const CreateUser = lazy(() =>
  import("@/features/users/routes/CreateUser").then((mod) => ({
    default: mod.CreateUser,
  }))
);
const ChangeUserPassword = lazy(() =>
  import("@/features/users/routes/ChangeUserPassword").then((mod) => ({
    default: mod.ChangeUserPassword,
  }))
);
const EditUser = lazy(() =>
  import("@/features/users/routes/EditUser").then((mod) => ({
    default: mod.EditUser,
  }))
);
const Rooms = lazy(() =>
  import("@/features/rooms/routes/Rooms").then((mod) => ({
    default: mod.Rooms,
  }))
);
const News = lazy(() =>
  import("@/features/news/routes/News").then((mod) => ({
    default: mod.News,
  }))
);
const CreateNews = lazy(() =>
  import("@/features/news/routes/CreateNews").then((mod) => ({
    default: mod.CreateNews,
  }))
);
const EditNews = lazy(() =>
  import("@/features/news/routes/EditNews").then((mod) => ({
    default: mod.EditNews,
  }))
);
const SpecialOffers = lazy(() =>
  import("@/features/special-offers/routes/SpecialOffers").then((mod) => ({
    default: mod.SpecialOffers,
  }))
);
const CreateSpecialOffer = lazy(() =>
  import("@/features/special-offers/routes/CreateSpecialOffer").then((mod) => ({
    default: mod.CreateSpecialOffer,
  }))
);
const EditSpecialOffer = lazy(() =>
  import("@/features/special-offers/routes/EditSpecialOffer").then((mod) => ({
    default: mod.EditSpecialOffer,
  }))
);
const Leisures = lazy(() =>
  import("@/features/leisures/routes/Leisures").then((mod) => ({
    default: mod.Leisures,
  }))
);
const CreateLeisure = lazy(() =>
  import("@/features/leisures/routes/CreateLeisure").then((mod) => ({
    default: mod.CreateLeisure,
  }))
);
const EditLeisure = lazy(() =>
  import("@/features/leisures/routes/EditLeisure").then((mod) => ({
    default: mod.EditLeisure,
  }))
);
const Reviews = lazy(() =>
  import("@/features/reviews/routes/Reviews").then((mod) => ({
    default: mod.Reviews,
  }))
);
const CreateReview = lazy(() =>
  import("@/features/reviews/routes/CreateReview").then((mod) => ({
    default: mod.CreateReview,
  }))
);
const EditReview = lazy(() =>
  import("@/features/reviews/routes/EditReview").then((mod) => ({
    default: mod.EditReview,
  }))
);
const HotelImages = lazy(() =>
  import("@/features/hotel-images/routes/HotelImages").then((mod) => ({
    default: mod.HotelImages,
  }))
);
const Newsletters = lazy(() =>
  import("@/features/newsletters/routes/Newsletters").then((mod) => ({
    default: mod.Newsletters,
  }))
);
const CreateNewsletter = lazy(() =>
  import("@/features/newsletters/routes/CreateNewsletter").then((mod) => ({
    default: mod.CreateNewsletter,
  }))
);
const EditNewsletter = lazy(() =>
  import("@/features/newsletters/routes/EditNewsletter").then((mod) => ({
    default: mod.EditNewsletter,
  }))
);
const Contacts = lazy(() =>
  import("@/features/contacts/routes/Contacts").then((mod) => ({
    default: mod.Contacts,
  }))
);
const EditContacts = lazy(() =>
  import("@/features/contacts/routes/EditContacts").then((mod) => ({
    default: mod.EditContacts,
  }))
);
const ChangeLogs = lazy(() =>
  import("@/features/change-logs/routes/ChangeLogs").then((mod) => ({
    default: mod.ChangeLogs,
  }))
);

const NavigateToDefaultRoute: FC = () => {
  const { user } = useAuthentication();

  if (!isNonNullable(user)) {
    return <Navigate replace to="/auth/login" />;
  }

  return <Navigate replace to={getDefaultRouteByRole(user.role)} />;
};

export const Authenticated: FC = () => (
  <Routes>
    <Route
      element={
        <Layout>
          <Outlet />
        </Layout>
      }
    >
      <Route
        path="/users"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <Users />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/users/create"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <CreateUser />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/users/:userID/change-password"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <ChangeUserPassword />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/users/:userID/edit"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <EditUser />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/rooms"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <Rooms />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/news"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <News />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/news/create"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <CreateNews />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/news/:newsID/edit"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <EditNews />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/special-offers"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <SpecialOffers />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/special-offers/create"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <CreateSpecialOffer />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/special-offers/:specialOfferID/edit"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <EditSpecialOffer />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/leisures"
        element={
          <ProtectedRouteInner
            allowedRoles={["admin", "manager"]}
            allowedManagerCities={["obn"]}
          >
            <Leisures />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/leisures/create"
        element={
          <ProtectedRouteInner
            allowedRoles={["admin", "manager"]}
            allowedManagerCities={["obn"]}
          >
            <CreateLeisure />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/leisures/:leisureID/edit"
        element={
          <ProtectedRouteInner
            allowedRoles={["admin", "manager"]}
            allowedManagerCities={["obn"]}
          >
            <EditLeisure />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/reviews"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <Reviews />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/reviews/create"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <CreateReview />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/reviews/:reviewID/edit"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <EditReview />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/hotel-images"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <HotelImages />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/newsletters"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <Newsletters />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/newsletters/create"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <CreateNewsletter />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/newsletters/:newsletterID/edit"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <EditNewsletter />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/contacts"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <Contacts />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/contacts/:city/edit"
        element={
          <ProtectedRouteInner allowedRoles={["admin", "manager"]}>
            <EditContacts />
          </ProtectedRouteInner>
        }
      />
      <Route
        path="/change-logs"
        element={
          <ProtectedRouteInner allowedRoles={["admin"]}>
            <ChangeLogs />
          </ProtectedRouteInner>
        }
      />
    </Route>
    <Route path="*" element={<NavigateToDefaultRoute />} />
  </Routes>
);
