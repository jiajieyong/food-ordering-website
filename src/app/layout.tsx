import ReduxProvider from "./reduxProvider";
import Navigation from  "@/components/layouts/navigationBar/navigation";
import { Toaster } from "@/components/ui/toaster";

import "../globals.css";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Food Ordering Website</title>
      </head>
      <body>

        <ReduxProvider>
          <Navigation />
            {children}
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
