import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.css";
import Root from "./Pages/Root";
import Home from "./Pages/Home/Home";
import About from "./Pages/About";
import Reviews from "./Pages/Reviews";
import Places from "./Pages/Places";
import Flights from "./Pages/Flights";
import Restaurants from "./Pages/Restaurants";
import PlaceDetails from "./Pages/PlaceDetails";
import PgNdrConstrctn from "./Pages/PgNdrConstrctn.jsx";
import Error from "./Pages/Error.jsx";
import Booking from "./Pages/Booking.jsx";
import { TravelAuthProvider } from "./Hooks/useTravelAuth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "Destinations",
        element: <Places />,
      },
      {
        path: "Destinations/:id",
        element: <PlaceDetails />,
      },
      { path: "Flights", element: <Flights /> },
      { path: "Restaurants", element: <Restaurants /> },
      { path: "About", element: <About /> },
      { path: "Reviews", element: <Reviews /> },
      { path: "workInProgress", element: <PgNdrConstrctn /> },
      { path: "Booking", element: <Booking /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

function App() {
  return (
    <TravelAuthProvider>
      <RouterProvider router={router} />
    </TravelAuthProvider>
  );
}

export default App;
