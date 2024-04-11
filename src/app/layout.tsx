import { Menubar, MenubarMenu, MenubarTrigger } from "../components/ui/menubar";
import "../globals.css";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Food Ordering Website</title>
      </head>
      <body>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Menu</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Order</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Queue</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        <div className="h-screen">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
