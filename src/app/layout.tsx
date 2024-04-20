"use client";
import { Provider } from "react-redux";
import { store } from '../redux/store';

import Navigation from  "../components/layouts/navigationBar/navigation";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Food Ordering Website</title>
      </head>
      <body>

        <Provider store={store}>
          <Navigation />
            {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
