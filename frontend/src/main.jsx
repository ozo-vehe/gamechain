import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import MonsterSelection from "./pages/MonstersPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlayStyle from "./pages/PlayStyle.jsx";
import GamePlay from "./pages/GamePlay.jsx";
import UploadMonster from "./pages/UploadMonster.jsx";

// Redux store
import { store } from "./features/store.js";
import { Provider } from "react-redux";

// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { config } from "./config/wagmi.js";
import MonsterDetailsPage from "./pages/MonsterDetailsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/monsters",
        element: <MonsterSelection />,
      },
      {
        path: "/monsters/:id",
        element: <MonsterDetailsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/play",
        element: <PlayStyle />,
      },
      {
        path: "/play/:id",
        element: <GamePlay />,
      },
      {
        path: "/upload-monster",
        element: <UploadMonster />,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardPage />,
      }
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
