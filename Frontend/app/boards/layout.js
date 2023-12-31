import "../globals.css";
import SideDrawer from "../components/SideDrawer";
import Navigation from "../components/Navigation";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div className="app-container">
      <SideDrawer />
      <div style={{ width: "calc(100% - 240px)", height: "100%" }}>
        <Navigation />
        <div
          style={{ height: "calc(100% - 3rem)" }}
          // className="overflow-y-hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
