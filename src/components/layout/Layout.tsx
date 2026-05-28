import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default Layout;
