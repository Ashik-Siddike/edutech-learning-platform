import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CoursesPage from "./components/CoursesPage";
import ProductsPage from "./components/ProductsPage";
import ContactPage from "./components/ContactPage";
import ReactHookForm from "./components/ReactHookForm";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

export default function App() {
  // Navigation state: "home" | "courses" | "products" | "contact" | "form"
  const [activeTab, setActiveTab] = useState("home");
  const [prefilledCourse, setPrefilledCourse] = useState("");

  // Persisted shopping cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Helper to show transient toast notifications
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  // Switch tabs and optionally prefill course selection
  const handleNavigation = (tab, courseTitle = "") => {
    if (courseTitle) {
      setPrefilledCourse(courseTitle);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add course to cart and sync with localStorage
  const addToCart = (course) => {
    const exists = cart.some((c) => c.id === course.id);
    if (!exists) {
      const updated = [...cart, course];
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      showToast(`Added "${course.title}" to cart!`);
    }
  };

  // Remove specific course from cart
  const removeFromCart = (courseId) => {
    const removedItem = cart.find((c) => c.id === courseId);
    const updated = cart.filter((c) => c.id !== courseId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    showToast(
      removedItem ? `Removed "${removedItem.title}" from cart.` : "Removed from cart."
    );
  };

  // Clear all items in cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    showToast("Cleared shopping cart.");
  };

  // Demo checkout: shows success toast without requiring payment
  const handleCheckout = () => {
    const count = cart.length;
    setCart([]);
    localStorage.removeItem("cart");
    setIsCartOpen(false);
    showToast(
      `Checkout successful! Enrolled in ${count} ${
        count === 1 ? "course" : "courses"
      }. (Demo mode - No payment required)`
    );
  };

  return (
    <div className="min-h-screen bg-[#12131a] text-white flex flex-col font-sans relative">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-orange-400/40 text-xs font-semibold animate-bounce max-w-sm">
          <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigation}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main page content */}
      <main className="flex-1 w-full">
        {activeTab === "home" && (
          <HomePage
            onNavigate={handleNavigation}
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        )}

        {activeTab === "courses" && (
          <CoursesPage
            onNavigateToForm={(courseTitle) => handleNavigation("form", courseTitle)}
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        )}

        {activeTab === "products" && (
          <ProductsPage
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        )}

        {activeTab === "contact" && (
          <ContactPage onShowToast={showToast} />
        )}

        {activeTab === "form" && (
          <div className="min-h-[calc(100vh-64px)] bg-[#949ca5] text-white flex items-center justify-center p-4 md:p-8">
            <div className="w-full flex justify-center">
              <ReactHookForm initialCourse={prefilledCourse} />
            </div>
          </div>
        )}
      </main>

      {/* Footer across all pages */}
      <Footer onNavigate={handleNavigation} />

      {/* Slide-over shopping cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        onExploreCourses={() => {
          handleNavigation("courses");
          setIsCartOpen(false);
        }}
      />
    </div>
  );
}

