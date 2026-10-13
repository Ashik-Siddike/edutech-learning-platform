import { useState } from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import ContactPage from "./components/ContactPage";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./components/CheckoutPage";
import MyOrdersPage from "./components/MyOrdersPage";
import Footer from "./components/Footer";

export default function App() {
  // Navigation state: "home" | "products" | "orders" | "contact" | "checkout"
  const [activeTab, setActiveTab] = useState("home");

  // Persisted shopping cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persisted applied coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem("appliedCoupon");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
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

  // Switch tabs
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add item to cart and sync with localStorage
  const addToCart = (product) => {
    const cleanId = String(product.id).replace(/^prod-/, "");
    const exists = cart.some(
      (c) => c.id === product.id || String(c.id).replace(/^prod-/, "") === cleanId
    );
    if (!exists) {
      const updated = [...cart, product];
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      showToast(`Added "${product.title}" to cart!`);
    } else {
      showToast(`"${product.title}" is already in your cart.`);
    }
  };

  // Remove specific item from cart
  const removeFromCart = (productId) => {
    const cleanId = String(productId).replace(/^prod-/, "");
    const removedItem = cart.find(
      (c) => c.id === productId || String(c.id).replace(/^prod-/, "") === cleanId
    );
    const updated = cart.filter(
      (c) => c.id !== productId && String(c.id).replace(/^prod-/, "") !== cleanId
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    showToast(
      removedItem ? `Removed "${removedItem.title}" from cart.` : "Removed from cart."
    );
  };

  // Apply coupon globally
  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    try {
      localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
    } catch (e) {
      console.warn(e);
    }
    showToast(`Coupon "${coupon.code}" applied!`);
  };

  // Remove applied coupon globally
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    try {
      localStorage.removeItem("appliedCoupon");
    } catch (e) {
      console.warn(e);
    }
    showToast("Coupon removed.");
  };

  // Clear all items in cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    handleRemoveCoupon();
    showToast("Cleared shopping cart.");
  };

  // Navigate to the checkout page from CartDrawer
  const handleCheckout = () => {
    setIsCartOpen(false);
    handleNavigation("checkout");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 bg-[#070b14]/95 backdrop-blur-xl text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-cyan-950/50 flex items-center gap-3 border border-cyan-500/40 text-xs font-semibold animate-bounce max-w-sm">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            ✓
          </div>
          <span className="leading-snug">{toastMessage}</span>
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
      <main className="flex-1 w-full pb-20 md:pb-0">
        {activeTab === "home" && (
          <HomePage
            onNavigate={handleNavigation}
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

        {activeTab === "orders" && (
          <MyOrdersPage onNavigate={handleNavigation} />
        )}

        {activeTab === "contact" && (
          <ContactPage onShowToast={showToast} />
        )}

        {activeTab === "checkout" && (
          <CheckoutPage
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
            onNavigate={handleNavigation}
            onShowToast={showToast}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={handleRemoveCoupon}
          />
        )}
      </main>

      {/* Footer across all pages */}
      <Footer onNavigate={handleNavigation} />

      {/* Floating Bottom Navigation Bar for Mobile */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={handleNavigation}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Slide-over shopping cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        onExploreCourses={() => {
          handleNavigation("products");
          setIsCartOpen(false);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </div>
  );
}

