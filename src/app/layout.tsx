"use client";
import { Provider } from "react-redux";
import { store } from '../redux/store';

import Navigation from  "../components/composite/navigation";
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
      </body>
    </html>
  );
};

export default RootLayout;
