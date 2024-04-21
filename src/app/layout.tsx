"use client";
import { Provider } from "react-redux";
import Navigation from  "@/components/layouts/navigationBar/navigation";
import { Toaster } from "@/components/ui/toaster";
import { store } from '@/redux/store';

import "../globals.css";

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
