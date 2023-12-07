import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
