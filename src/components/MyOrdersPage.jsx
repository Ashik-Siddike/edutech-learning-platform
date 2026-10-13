// My Orders & Shipment Tracking Page for E-Commerce Store
import { useState, useEffect } from "react";

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
    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop";
  };

  return (
    <div className="w-full min-h-screen bg-[#12131a] text-gray-200 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#191b24] via-[#212430] to-[#191b24] p-6 sm:p-10 border border-gray-800 shadow-xl overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-700/50 text-orange-400 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Customer Order Center</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight leading-tight mb-2">
              My Orders & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df5d2c] to-[#f98054]">Deliveries</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Track your recent store orders, delivery progress, and download official invoices.
            </p>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-[#191b24] rounded-3xl border border-gray-800 p-12 text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#212430] border border-gray-700 flex items-center justify-center mx-auto text-gray-400">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-white">No orders placed yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Explore our tech gadgets, laptops, smartphones, and lifestyle items to place your first order.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("products")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-xs font-semibold hover:opacity-95 transition cursor-pointer shadow-lg active:scale-95"
            >
              Start Shopping Now →
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Total Orders: <strong className="text-white">{orders.length}</strong></span>
              <button
                type="button"
                onClick={() => onNavigate("products")}
                className="text-orange-400 hover:text-orange-300 font-semibold cursor-pointer underline text-xs"
              >
                + Browse More Products
              </button>
            </div>

            <div className="space-y-4">
              {orders.map((ord, idx) => (
                <div
                  key={idx}
                  className="bg-[#191b24] border border-gray-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg hover:border-gray-700 transition"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-gray-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">
                          Order #{ord.orderId || `ORD-${idx + 1001}`}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-[10px] font-semibold">
                          ✓ Confirmed
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        Placed on: {ord.orderDate || "Recently"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg font-bold text-[#df5d2c]">
                        ৳{Number(ord.grandTotal || 0).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(ord)}
                        className="px-3 py-1.5 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-200 border border-gray-700 text-xs font-semibold cursor-pointer transition flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>View Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ord.items && ord.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-2.5 rounded-xl bg-[#212430]/70 border border-gray-800 flex items-center gap-2.5 text-xs"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#14161f] overflow-hidden shrink-0 border border-gray-700">
                          <img
                            src={getItemImage(item)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-white truncate text-xs">{item.title}</h4>
                          <span className="font-mono text-orange-400 text-[11px] block">
                            ৳{Number(item.price || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Payment Details Footer */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pt-2 text-[11px] text-gray-400 border-t border-gray-800/80">
                    <div>
                      <span>Delivery: </span>
                      <span className="text-gray-300 font-medium">
                        {ord.customer?.address ? `${ord.customer.address}, ` : ""}
                        {ord.customer?.division || "Dhaka"} Division
                      </span>
                    </div>
                    <div>
                      <span>Payment: </span>
                      <span className="text-gray-300 uppercase font-medium">{ord.paymentMethod || "bKash"}</span>
                      {ord.trxId && (
                        <span className="font-mono text-gray-400 ml-1">({ord.trxId})</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#191b24] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <span className="text-xs text-orange-400 font-semibold uppercase tracking-wider">Official Invoice</span>
                <h3 className="text-xl font-serif font-bold text-white">Suffex Store BD</h3>
                <p className="text-xs text-gray-400 mt-0.5">Order ID: {selectedInvoice.orderId}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center text-xs cursor-pointer border border-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Customer Details */}
            <div className="p-3.5 rounded-xl bg-[#212430] text-xs grid grid-cols-2 gap-3">
              <div>
                <span className="text-gray-400 block text-[10px]">Customer:</span>
                <span className="font-semibold text-white block">{selectedInvoice.customer?.fullName || "Guest Customer"}</span>
                <span className="text-gray-300 block">{selectedInvoice.customer?.phone}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Payment & Date:</span>
                <span className="text-gray-300 block">{selectedInvoice.orderDate}</span>
                <span className="text-emerald-400 font-mono block uppercase">Paid via {selectedInvoice.paymentMethod}</span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-gray-400">Order Items</span>
              <div className="divide-y divide-gray-800 border-y border-gray-800 text-xs">
                {selectedInvoice.items && selectedInvoice.items.map((item, i) => (
                  <div key={i} className="py-2.5 flex justify-between items-center">
                    <span className="text-gray-200">{item.title}</span>
                    <span className="font-mono font-semibold text-white">৳{Number(item.price || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">৳{Number(selectedInvoice.subtotal || 0).toLocaleString()}</span>
              </div>
              {selectedInvoice.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-৳{Number(selectedInvoice.couponDiscount).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-gray-800">
                <span>Grand Total</span>
                <span className="font-mono text-[#df5d2c]">৳{Number(selectedInvoice.grandTotal || 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#b0401d] to-[#df5d2c] text-white text-xs font-semibold cursor-pointer transition shadow"
              >
                Print Invoice
              </button>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="py-2.5 px-5 rounded-xl bg-[#212430] hover:bg-[#2a2e3d] text-gray-200 border border-gray-700 text-xs font-semibold cursor-pointer transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
