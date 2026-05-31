import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, showFooter = true }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0a0a] via-[#120808] to-[#0a0a0a] text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;
