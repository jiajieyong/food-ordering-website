import Navigation from  "../components/composite/navigation";
import "../globals.css";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Food Ordering Website</title>
      </head>
      <body>
        <Navigation />
        <div className="h-screen">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
