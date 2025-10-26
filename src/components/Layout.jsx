import Header from "./Header";
import Footer from "./Footer";
import { ToastProvider } from "../context/ToastContext";

export default function Layout({ children }) {
  return (
    <ToastProvider>
      <div className="layout">
        <Header />
        <main className="main-content">{children}</main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
