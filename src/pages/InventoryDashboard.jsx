import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingCart, Calendar, MessageCircle, Search, Plus, Filter, AlertCircle, CheckCircle2, Truck, CreditCard, ChevronRight, X } from 'lucide-react';
import GridOverlay from '../components/GridOverlay';
import StickyNav from '../components/StickyNav';

// Mock Data: Dental Instruments
const MOCK_INVENTORY = [
  { id: 1, sku: 'GEN-01', name: 'Standard Instrument A', stock: 150, price: 10.00 },
  { id: 2, sku: 'GEN-02', name: 'Disposable Item B', stock: 300, price: 5.00 },
  { id: 3, sku: 'GEN-03', name: 'Specialty Tool C', stock: 85, price: 30.00 },
  { id: 4, sku: 'GEN-04', name: 'Common Supply D', stock: 120, price: 15.00 },
  { id: 5, sku: 'GEN-05', name: 'Advanced Equipment E', stock: 45, price: 50.00 },
  { id: 6, sku: 'GEN-06', name: 'Premium Device F', stock: 12, price: 299.00 },
];

const MOCK_ORDERS = [
  { 
    id: 'ORD-1001', 
    client: 'Local Clinic A', 
    date: '2026-03-14', 
    status: 'shipped', 
    payment: 'unpaid', 
    total: 200.00, 
    items: [{ sku: 'GEN-05', qty: 4 }],
    tracking: '1Z9999999999999999',
    carrier: 'UPS'
  },
  { 
    id: 'ORD-1002', 
    client: 'Regional Practice B', 
    date: '2026-03-15', 
    status: 'delayed', 
    payment: 'paid', 
    total: 60.00, 
    items: [{ sku: 'GEN-02', qty: 12 }],
    tracking: '9400100000000000000000',
    carrier: 'USPS'
  },
  { 
    id: 'ORD-1003', 
    client: 'Dental Group C', 
    date: '2026-03-15', 
    status: 'processing', 
    payment: 'unpaid', 
    total: 1196.00, 
    items: [{ sku: 'GEN-06', qty: 4 }],
    tracking: null,
    carrier: null
  },
];

export default function InventoryDashboard() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inventory'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'shipped': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'delayed': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      case 'processing': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
    }
  };

  const getPaymentColor = (status) => {
    return status === 'paid' 
      ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
      : 'text-amber-400 bg-amber-400/10 border-amber-400/20';
  };

  return (
    <div className="retro-theme min-h-screen antialiased overflow-x-hidden flex flex-col" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}>
      <GridOverlay />
      <StickyNav currentPage="dashboard" />
      
      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 pb-32">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-1">Command Center</h1>
            <p className="text-sm text-[var(--retro-text-muted)]">Manage inventory, orders, and logistics.</p>
          </div>
          <div className="flex gap-2">
            <button className="retro-rgb-btn flex items-center justify-center w-10 h-10 rounded-xl" title="New Order/Scan">
              <Plus className="w-5 h-5" />
            </button>
            <button className="retro-card flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)]">
              <Calendar className="w-5 h-5 opacity-70" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl bg-[var(--retro-bg-elevated)] border border-[var(--retro-border)] inline-flex">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'orders' ? 'bg-[var(--retro-bg)] text-[var(--retro-text)] shadow-sm' : 'text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'inventory' ? 'bg-[var(--retro-bg)] text-[var(--retro-text)] shadow-sm' : 'text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]'}`}
          >
            Inventory
          </button>
        </div>

        {/* Filters/Search Area */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--retro-text-dim)]" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab}...`} 
              className="w-full bg-[var(--retro-bg-elevated)] border border-[var(--retro-border)] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[var(--retro-border-bright)] transition-colors"
            />
          </div>
          <button className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--retro-bg-elevated)] border border-[var(--retro-border)] text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' ? (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {MOCK_ORDERS.map((order) => (
                <div 
                  key={order.id} 
                  onClick={() => setSelectedOrder(order)}
                  className="retro-card rounded-2xl p-5 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{order.id}</span>
                        <span className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">{order.date}</span>
                      </div>
                      <p className="text-sm text-[var(--retro-text-muted)] font-medium">{order.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border ${getPaymentColor(order.payment)}`}>
                        {order.payment}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--retro-text-dim)] group-hover:text-[var(--retro-text)] transition-colors" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {MOCK_INVENTORY.map((item) => (
                <div key={item.id} className="retro-card rounded-2xl p-5 border border-[var(--retro-border)] flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--retro-bg)] border border-[var(--retro-border)] flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-[var(--retro-text-dim)]" />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.stock < 50 ? 'bg-rose-400/10 text-rose-400 border border-rose-400/20' : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'}`}>
                      {item.stock} in stock
                    </span>
                  </div>
                  <div className="mb-4 flex-1">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-1">{item.sku}</p>
                    <h3 className="font-bold text-sm leading-snug">{item.name}</h3>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[var(--retro-border)]">
                    <div className="text-right ml-auto">
                      <p className="text-[10px] text-[var(--retro-text-dim)] uppercase tracking-wider">Retail Price</p>
                      <p className="font-bold text-sm">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Order Detail Modal (Mobile-first slide-up overlay style) */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[var(--retro-bg)] border-l border-[var(--retro-border)] shadow-2xl overflow-y-auto flex flex-col"
            >
              <div className="sticky top-0 z-10 bg-[var(--retro-bg)]/80 backdrop-blur-md border-b border-[var(--retro-border)] px-6 py-4 flex items-center justify-between">
                <h2 className="font-extrabold text-lg">{selectedOrder.id}</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-[var(--retro-bg-elevated)] rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex-1 space-y-8">
                {/* Client Info */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-2">Customer</h3>
                  <p className="font-bold text-xl">{selectedOrder.client}</p>
                  <p className="text-sm text-[var(--retro-text-muted)] mt-1">{selectedOrder.date}</p>
                </div>
                
                {/* Status Badges */}
                <div className="flex gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status === 'shipped' ? <Truck className="w-4 h-4" /> : selectedOrder.status === 'delayed' ? <AlertCircle className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                    <span className="text-xs uppercase font-bold tracking-wider">{selectedOrder.status}</span>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${getPaymentColor(selectedOrder.payment)}`}>
                    {selectedOrder.payment === 'paid' ? <CheckCircle2 className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                    <span className="text-xs uppercase font-bold tracking-wider">{selectedOrder.payment}</span>
                  </div>
                </div>

                {/* Tracking & Logistics */}
                <div className="retro-card rounded-2xl p-4 border border-[var(--retro-border)]">
                  <h3 className="text-[10px] uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-3 flex items-center gap-2"><Truck className="w-3 h-3"/> Logistics Info</h3>
                  {selectedOrder.carrier ? (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">{selectedOrder.carrier} Tracking</p>
                      <p className="text-xs font-mono text-[var(--retro-text-muted)] bg-[var(--retro-bg)] p-2 rounded-lg break-all border border-[var(--retro-border)]">
                        {selectedOrder.tracking}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-[var(--retro-text-dim)] italic">No tracking info available yet.</p>
                  )}
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-3 flex items-center gap-2"><ShoppingCart className="w-3 h-3"/> Line Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-[var(--retro-border)] border-dashed">
                        <div>
                          <p className="font-semibold text-sm">{item.sku}</p>
                          <p className="text-xs text-[var(--retro-text-muted)]">Qty: {item.qty}</p>
                        </div>
                        {/* Mock looking up price from inventory list */}
                        {(() => {
                          const inventoryItem = MOCK_INVENTORY.find(i => i.sku === item.sku);
                          return inventoryItem ? (
                            <p className="font-bold text-sm text-[var(--retro-text)]">${(inventoryItem.price * item.qty).toFixed(2)}</p>
                          ) : null;
                        })()}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-[var(--retro-text-muted)]">Total</span>
                    <span className="font-extrabold text-xl">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Quick Actions Base44 / WA */}
                <div>
                   <h3 className="text-[10px] uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-3 flex items-center gap-2"><MessageCircle className="w-3 h-3"/> Actions</h3>
                   <div className="grid grid-cols-2 gap-2">
                      <button className="flex items-center gap-2 justify-center py-3 px-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-xl font-bold text-sm hover:bg-[#25D366]/20 transition-colors">
                        <MessageCircle className="w-4 h-4"/> WhatsApp
                      </button>
                      <button className="flex items-center gap-2 justify-center py-3 px-4 bg-zinc-800 text-white dark:bg-zinc-100 dark:text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                        <Calendar className="w-4 h-4"/> Add to Cal
                      </button>
                   </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
