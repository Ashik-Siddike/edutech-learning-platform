import { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  X,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function MyOrdersPage({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
      setOrders(savedOrders);
    } catch (e) {
      console.warn("Could not load orders from localStorage:", e);
      setOrders([]);
    }
  }, []);

  const getItemImage = (item) => {
    if (item?.directImage && typeof item.directImage === "string" && item.directImage.startsWith("http")) {
      return item.directImage;
    }
    if (item?.image && typeof item.image === "string" && item.image.startsWith("http")) {
      return item.image;
    }
    if (item?.thumbnail && typeof item.thumbnail === "string" && item.thumbnail.startsWith("http")) {
      return item.thumbnail;
    }
    return "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop";
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 animate-fadeIn font-sans">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#091124] via-[#0d1734] to-[#060b18] p-6 sm:p-10 border border-cyan-500/20 shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Package className="w-3.5 h-3.5" />
            <span>CUSTOMER ORDER HUB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            My Orders &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Deliveries
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Real-time tracking of your store purchases, delivery progress across Bangladesh, and official tax invoices.
          </p>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="rounded-3xl bg-[#090e1c] border border-white/[0.08] p-16 text-center max-w-md mx-auto space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">No orders placed yet</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Explore our smartphones, laptops, audio gear, and lifestyle products to place your first order.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("products")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-xs font-bold hover:opacity-95 transition cursor-pointer shadow-lg shadow-cyan-950/50 active:scale-95 inline-flex items-center gap-2"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Total Orders Logged: <strong className="text-white font-mono">{orders.length}</strong>
            </span>
            <button
              type="button"
              onClick={() => onNavigate("products")}
              className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer inline-flex items-center gap-1 text-xs"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-5">
            {orders.map((ord, idx) => (
              <div
                key={idx}
                className="bg-[#070b14] border border-white/[0.08] hover:border-cyan-500/30 rounded-3xl p-5 sm:p-7 space-y-5 shadow-xl transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-white/[0.08]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono text-sm font-bold text-white">
                        Order #{ord.orderId || `SFX-${idx + 1001}`}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Confirmed & Processing</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      Order Date: {ord.orderDate || "Recently"}
                    </span>
                  </div>    

                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xl font-black text-cyan-400">
                      ৳{Number(ord.grandTotal || 0).toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(ord)}
                      className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-cyan-500/10 hover:border-cyan-500/30 text-slate-200 border border-white/10 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>View Invoice</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </div>
                </div>

                {/* Visual Shipment Tracking Timeline */}
                <div className="bg-[#030712] p-4 sm:p-5 rounded-2xl border border-white/[0.06]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3 font-['Outfit']">
                    Live Shipment Status
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block text-xs">Order Placed</span>
                        <span className="text-[10px] text-emerald-400">Verified</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block text-xs">Packed in Hub</span>
                        <span className="text-[10px] text-emerald-400">Quality Checked</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-cyan-400 block text-xs">In Transit</span>
                        <span className="text-[10px] text-slate-400">Steadfast / Pathao</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 opacity-60">
                      <div className="w-7 h-7 rounded-full bg-white/[0.05] text-slate-400 border border-white/10 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-300 block text-xs">Out for Delivery</span>
                        <span className="text-[10px] text-slate-500">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-['Outfit']">
                    Purchased Items ({ord.items?.length || 0})
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ord.items?.map((item, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 flex items-center gap-3 transition"
                      >
                        <div className="w-12 h-12 rounded-lg bg-[#030712] border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img
                            src={getItemImage(item)}
                            alt={item.title}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-semibold text-white truncate font-['Outfit']">
                            {item.title}
                          </h5>
                          <span className="text-xs font-extrabold text-cyan-400 font-mono block mt-0.5">
                            ৳{Number(item.price || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice Modal Overlay */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#060a16] border border-cyan-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-xs space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold font-['Outfit'] shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                  S
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white font-['Outfit']">
                    Official Tax Invoice
                  </h3>
                  <span className="font-mono text-slate-400 text-[11px]">
                    Invoice #{selectedInvoice.orderId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="w-8 h-8 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#030712] border border-white/[0.06]">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Customer Name</span>
                <span className="text-xs font-bold text-white block">{selectedInvoice.customer?.fullName || "Valued Shopper"}</span>
                <span className="text-slate-400 block mt-0.5">{selectedInvoice.customer?.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Shipping Destination</span>
                <span className="text-xs font-medium text-slate-300 block">{selectedInvoice.customer?.address}</span>
                <span className="text-slate-400 block mt-0.5">{selectedInvoice.customer?.division}, Bangladesh</span>
              </div>
            </div>

            {/* Item Breakdown */}
            <div className="divide-y divide-white/[0.06] border-y border-white/[0.08]">
              {selectedInvoice.items?.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={getItemImage(item)}
                      alt={item.title}
                      className="w-9 h-9 rounded-lg object-contain bg-[#030712] p-1 border border-white/10"
                    />
                    <span className="font-semibold text-white">{item.title}</span>
                  </div>
                  <span className="font-mono font-bold text-white">৳{Number(item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Total Financial Summary */}
            <div className="space-y-1.5 pt-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">৳{selectedInvoice.subtotal?.toLocaleString()}</span>
              </div>
              {selectedInvoice.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Savings</span>
                  <span className="font-mono">-৳{selectedInvoice.couponDiscount.toLocaleString()}</span>
                </div>
              )}
              {selectedInvoice.shippingFee > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>Express Shipping</span>
                  <span className="font-mono text-white">৳{selectedInvoice.shippingFee}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-bold text-white pt-3 border-t border-white/[0.08]">
                <span className="font-['Outfit']">Grand Total Paid</span>
                <span className="font-mono text-lg text-cyan-400">৳{selectedInvoice.grandTotal?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
