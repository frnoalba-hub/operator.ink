import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingCart, Calendar, MessageCircle, Search, Plus, Filter, AlertCircle, CheckCircle2, Truck, CreditCard, ChevronRight, X, Mail, Bell, Activity, ArrowUpRight, ArrowDownRight, Zap, Info, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import GridOverlay from '../components/GridOverlay';
import StickyNav from '../components/StickyNav';
import BackToHome from '../components/BackToHome';
import { createPageUrl } from '@/utils';

const DASHBOARD_TITLE = 'Operations Sample — Inventory, Orders & Inbox | Operator.ink';
const DASHBOARD_DESC =
  'Interactive sample: inventory with stock levels, orders with detail drawer, unified inbox, and integration cards. Synthetic data; patterns used on client builds.';

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

const MOCK_INBOX = [
  { id: 'msg-1', type: 'whatsapp', sender: 'Dr. Smith (Dental Group C)', time: '10 mins ago', snippet: 'Can we add 2 more Premium Devices to ORD-1003 before it ships?', unread: true },
  { id: 'msg-2', type: 'email', source: 'Gmail parser', sender: 'orders@localclinic.com', time: '1 hour ago', snippet: 'New Purchase Order attached for 10 Standard Instruments. Please confirm.', unread: true },
  { id: 'msg-3', type: 'alert', sender: 'System (Stripe)', time: '2 hours ago', snippet: 'Action Required: Payment failed for Regional Practice B. Click to send reminder.', unread: true },
  { id: 'msg-4', type: 'email', source: 'Yahoo Mail', sender: 'billing@smilefamily.com', time: '1 day ago', snippet: 'Thank you, invoice paid. Receipt requested.', unread: false }
];

const MOCK_INTEGRATIONS = [
  { id: 'int-1', name: 'WhatsApp Business', desc: 'Omnichannel messaging & notifications', status: 'connected', icon: MessageCircle, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10', border: 'border-[#25D366]/20' },
  { id: 'int-2', name: 'Stripe', desc: 'Payment processing & invoicing', status: 'connected', icon: CreditCard, color: 'text-[#635BFF]', bg: 'bg-[#635BFF]/10', border: 'border-[#635BFF]/20' },
  { id: 'int-3', name: 'Gmail Workspace', desc: 'Email parsing & PO ingestion', status: 'connected', icon: Mail, color: 'text-[#EA4335]', bg: 'bg-[#EA4335]/10', border: 'border-[#EA4335]/20' },
  { id: 'int-4', name: 'USPS / FedEx', desc: 'Real-time logistics tracking', status: 'connected', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'int-5', name: 'QuickBooks', desc: 'Accounting sync', status: 'disconnected', icon: Activity, color: 'text-zinc-400', bg: 'bg-zinc-400/10', border: 'border-zinc-400/20' },
];

const LOW_STOCK_THRESHOLD = 50;
const UNREAD_INBOX = MOCK_INBOX.filter((m) => m.unread).length;

function lookupSku(sku) {
  return MOCK_INVENTORY.find((i) => i.sku === sku);
}

function orderLineSummary(order) {
  if (!order.items?.length) return '—';
  const first = order.items[0];
  const inv = lookupSku(first.sku);
  const label = inv?.name ?? first.sku;
  if (order.items.length > 1) return `${label} +${order.items.length - 1} more`;
  return label;
}

export default function InventoryDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTracking, setCopiedTracking] = useState(false);

  const maxStock = useMemo(() => Math.max(...MOCK_INVENTORY.map((i) => i.stock), 1), []);
  const pendingOrdersCount = useMemo(
    () => MOCK_ORDERS.filter((o) => o.status === 'processing' || o.status === 'delayed').length,
    []
  );
  const lowStockCount = useMemo(
    () => MOCK_INVENTORY.filter((i) => i.stock < LOW_STOCK_THRESHOLD).length,
    []
  );
  const connectedIntegrations = useMemo(
    () => MOCK_INTEGRATIONS.filter((i) => i.status === 'connected').length,
    []
  );

  const q = searchQuery.trim().toLowerCase();
  const filteredOrders = useMemo(() => {
    if (!q) return MOCK_ORDERS;
    return MOCK_ORDERS.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.client.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q) ||
        o.payment.toLowerCase().includes(q) ||
        o.items.some((it) => it.sku.toLowerCase().includes(q) || lookupSku(it.sku)?.name.toLowerCase().includes(q))
    );
  }, [q]);

  const filteredInventory = useMemo(() => {
    if (!q) return MOCK_INVENTORY;
    return MOCK_INVENTORY.filter((i) => i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q));
  }, [q]);

  const filteredInbox = useMemo(() => {
    if (!q) return MOCK_INBOX;
    return MOCK_INBOX.filter(
      (m) =>
        m.sender.toLowerCase().includes(q) ||
        m.snippet.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q) ||
        (m.source && m.source.toLowerCase().includes(q))
    );
  }, [q]);

  const filteredIntegrations = useMemo(() => {
    if (!q) return MOCK_INTEGRATIONS;
    return MOCK_INTEGRATIONS.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q));
  }, [q]);

  useEffect(() => {
    if (!selectedOrder) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedOrder(null);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedOrder]);

  useEffect(() => {
    setCopiedTracking(false);
  }, [selectedOrder?.id]);

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
    <>
      <SEO title={DASHBOARD_TITLE} description={DASHBOARD_DESC} canonicalUrl="https://operator.ink/InventoryDashboard" />
      <div className="retro-theme min-h-screen antialiased overflow-x-hidden flex flex-col" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }} role="document">
      <GridOverlay />
      <StickyNav currentPage="inventorydashboard" />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 pb-32">
        <BackToHome />

        {/* Page Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="text-3xl font-extrabold tracking-tight">Operations sample</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded-full">Demo</span>
            </div>
            <p className="text-sm text-[var(--retro-text-muted)] max-w-xl">
              Synthetic data — same patterns we use for inventory, orders, inbox, and integrations on client builds.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="retro-rgb-btn flex items-center justify-center w-10 h-10 rounded-xl" title="New order (demo)" aria-label="New order, demo only">
              <Plus className="w-5 h-5" />
            </button>
            <button type="button" className="retro-card flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)]" aria-label="Calendar, demo only">
              <Calendar className="w-5 h-5 opacity-70" />
            </button>
          </div>
        </header>

        <div className="flex items-start gap-3 retro-card rounded-xl px-4 py-3 border border-[var(--retro-border)] mb-6 text-sm text-[var(--retro-text-muted)]">
          <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden />
          <p className="m-0 leading-relaxed">
            Search filters the active tab. KPIs below match this sample dataset (except revenue, which is illustrative).{' '}
            <Link to={`${createPageUrl('Home')}#intake`} className="retro-link font-semibold text-[var(--retro-text)]">
              Request a real build →
            </Link>
          </p>
        </div>

        {/* Top Level KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8" aria-label="Key metrics">
          <div className="retro-card rounded-2xl p-4 border border-[var(--retro-border)]">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">Revenue (7d)</p>
              <Activity className="w-4 h-4 text-emerald-400" aria-hidden />
            </div>
            <p className="text-xl md:text-2xl font-extrabold">$14,250</p>
            <p className="text-[10px] md:text-xs text-emerald-400 mt-1 flex items-center font-bold">
              <ArrowUpRight className="w-3 h-3 mr-0.5" aria-hidden /> Illustrative
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveTab('orders');
              setSearchQuery('');
            }}
            className="text-left retro-card rounded-2xl p-4 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">Open orders (sample)</p>
              <Package className="w-4 h-4 text-cyan-400" aria-hidden />
            </div>
            <p className="text-xl md:text-2xl font-extrabold">{pendingOrdersCount}</p>
            <p className="text-[10px] md:text-xs text-[var(--retro-text-muted)] mt-1 font-medium">Click to view Orders tab</p>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('inventory');
              setSearchQuery('');
            }}
            className="text-left retro-card rounded-2xl p-4 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">{`Low stock (<${LOW_STOCK_THRESHOLD})`}</p>
              <AlertCircle className="w-4 h-4 text-rose-400" aria-hidden />
            </div>
            <p className="text-xl md:text-2xl font-extrabold">{lowStockCount}</p>
            <p className="text-[10px] md:text-xs text-rose-400 mt-1 flex items-center font-bold">
              <ArrowDownRight className="w-3 h-3 mr-0.5" aria-hidden /> Click for Inventory
            </p>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('integrations');
              setSearchQuery('');
            }}
            className="text-left retro-card rounded-2xl p-4 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">Integrations live</p>
              <Zap className="w-4 h-4 text-amber-400" aria-hidden />
            </div>
            <p className="text-xl md:text-2xl font-extrabold">
              {connectedIntegrations}/{MOCK_INTEGRATIONS.length}
            </p>
            <p className="text-[10px] md:text-xs text-[var(--retro-text-muted)] mt-1 font-medium">Click to view Integrations</p>
          </button>
        </section>

        {/* Tab Navigation */}
        <nav
          role="tablist"
          aria-label="Dashboard sections"
          className="flex gap-2 mb-6 p-1 rounded-xl bg-[var(--retro-bg-elevated)] border border-[var(--retro-border)] inline-flex overflow-x-auto max-w-full hide-scrollbar"
        >
          <button
            type="button"
            role="tab"
            id="tab-orders"
            aria-selected={activeTab === 'orders'}
            aria-controls="panel-orders"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'orders' ? 'bg-[var(--retro-bg)] text-[var(--retro-text)] shadow-sm' : 'text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]'}`}
          >
            Orders
          </button>
          <button
            type="button"
            role="tab"
            id="tab-inventory"
            aria-selected={activeTab === 'inventory'}
            aria-controls="panel-inventory"
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'inventory' ? 'bg-[var(--retro-bg)] text-[var(--retro-text)] shadow-sm' : 'text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]'}`}
          >
            Inventory
          </button>
          <button
            type="button"
            role="tab"
            id="tab-inbox"
            aria-selected={activeTab === 'inbox'}
            aria-controls="panel-inbox"
            onClick={() => setActiveTab('inbox')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'inbox' ? 'bg-[var(--retro-bg)] text-[var(--retro-text)] shadow-sm' : 'text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]'}`}
          >
            Inbox
            <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold">{UNREAD_INBOX}</span>
          </button>
          <button
            type="button"
            role="tab"
            id="tab-integrations"
            aria-selected={activeTab === 'integrations'}
            aria-controls="panel-integrations"
            onClick={() => setActiveTab('integrations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === 'integrations' ? 'bg-[var(--retro-bg)] text-[var(--retro-text)] shadow-sm' : 'text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]'}`}
          >
            Integrations
            <span className="flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500" aria-hidden />
          </button>
        </nav>

        {/* Filters/Search Area */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--retro-text-dim)] pointer-events-none" aria-hidden />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}…`}
              aria-label={`Search ${activeTab}`}
              className="w-full bg-[var(--retro-bg-elevated)] border border-[var(--retro-border)] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[var(--retro-border-bright)] transition-colors"
            />
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--retro-bg-elevated)] border border-[var(--retro-border)] text-[var(--retro-text-muted)] hover:text-[var(--retro-text)]"
            aria-label="Filters (demo)"
          >
            <Filter className="w-4 h-4" aria-hidden />
          </button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' ? (
            <motion.section
              key="orders"
              id="panel-orders"
              role="tabpanel"
              aria-labelledby="tab-orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filteredOrders.length === 0 ? (
                <p className="retro-card rounded-2xl p-8 border border-[var(--retro-border)] text-center text-sm text-[var(--retro-text-muted)]">
                  No orders match &ldquo;{searchQuery.trim()}&rdquo;. Clear search or try another tab.
                </p>
              ) : (
                filteredOrders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="w-full text-left retro-card rounded-2xl p-5 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] cursor-pointer transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-3 gap-2 sm:gap-0">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold">{order.id}</span>
                          <span className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">{order.date}</span>
                        </div>
                        <p className="text-sm text-[var(--retro-text-muted)] font-medium">{order.client}</p>
                        <p className="text-xs text-[var(--retro-text-dim)] mt-1.5 truncate max-w-full">{orderLineSummary(order)}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-wrap gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border ${getPaymentColor(order.payment)}`}>
                          {order.payment}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[var(--retro-text-dim)] group-hover:text-[var(--retro-text)] transition-colors flex-shrink-0" aria-hidden />
                    </div>
                  </button>
                ))
              )}
            </motion.section>
          ) : activeTab === 'inventory' ? (
            <motion.section
              key="inventory"
              id="panel-inventory"
              role="tabpanel"
              aria-labelledby="tab-inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredInventory.length === 0 ? (
                <p className="col-span-full retro-card rounded-2xl p-8 border border-[var(--retro-border)] text-center text-sm text-[var(--retro-text-muted)]">
                  No SKUs match &ldquo;{searchQuery.trim()}&rdquo;.
                </p>
              ) : (
                filteredInventory.map((item) => {
                  const pct = Math.min(100, Math.round((item.stock / maxStock) * 100));
                  const low = item.stock < LOW_STOCK_THRESHOLD;
                  return (
                    <div key={item.id} className="retro-card rounded-2xl p-5 border border-[var(--retro-border)] flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[var(--retro-bg)] border border-[var(--retro-border)] flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-[var(--retro-text-dim)]" aria-hidden />
                        </div>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-md border ${low ? 'bg-rose-400/10 text-rose-400 border-rose-400/20' : 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'}`}
                        >
                          {item.stock} in stock
                        </span>
                      </div>
                      <div className="mb-3 flex-1">
                        <p className="text-[10px] uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-1">{item.sku}</p>
                        <h3 className="font-bold text-sm leading-snug">{item.name}</h3>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] text-[var(--retro-text-dim)] uppercase tracking-wider font-bold mb-1">
                          <span>Level</span>
                          <span>{pct}% of max sample</span>
                        </div>
                        <div className="h-2 rounded-full bg-[var(--retro-bg)] border border-[var(--retro-border)] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${low ? 'bg-rose-400/80' : 'bg-cyan-400/70'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 border-t border-[var(--retro-border)] gap-1">
                        <div className="text-left sm:text-right sm:ml-auto">
                          <p className="text-[10px] text-[var(--retro-text-dim)] uppercase tracking-wider">Retail Price</p>
                          <p className="font-bold text-sm">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.section>
          ) : activeTab === 'inbox' ? (
            <motion.section
              key="inbox"
              id="panel-inbox"
              role="tabpanel"
              aria-labelledby="tab-inbox"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filteredInbox.length === 0 ? (
                <p className="retro-card rounded-2xl p-8 border border-[var(--retro-border)] text-center text-sm text-[var(--retro-text-muted)]">
                  No messages match &ldquo;{searchQuery.trim()}&rdquo;.
                </p>
              ) : (
                filteredInbox.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`retro-card rounded-2xl p-5 border cursor-pointer transition-all group ${msg.unread ? 'border-[var(--retro-border-bright)] bg-[var(--retro-bg-elevated)]' : 'border-[var(--retro-border)] opacity-70'}`}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {msg.type === 'whatsapp' && (
                        <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center border border-[#25D366]/20">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                      )}
                      {msg.type === 'email' && (
                        <div className="w-10 h-10 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center border border-cyan-400/20">
                          <Mail className="w-5 h-5" />
                        </div>
                      )}
                      {msg.type === 'alert' && (
                        <div className="w-10 h-10 rounded-full bg-rose-400/10 text-rose-400 flex items-center justify-center border border-rose-400/20">
                          <Bell className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm truncate">{msg.sender}</h3>
                          {msg.unread && <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />}
                        </div>
                        <span className="text-[10px] text-[var(--retro-text-dim)] font-bold tracking-wider uppercase whitespace-nowrap ml-2">{msg.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--retro-text-dim)]">
                          {msg.type === 'email' ? msg.source : msg.type === 'whatsapp' ? 'WhatsApp Business' : 'Internal Alert'}
                        </span>
                      </div>
                      <p className={`text-sm line-clamp-2 ${msg.unread ? 'text-[var(--retro-text)]' : 'text-[var(--retro-text-muted)]'}`}>
                        {msg.snippet}
                      </p>
                    </div>
                  </div>
                </div>
                ))
              )}
            </motion.section>
          ) : activeTab === 'integrations' ? (
            <motion.section
              key="integrations"
              id="panel-integrations"
              role="tabpanel"
              aria-labelledby="tab-integrations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6 retro-card rounded-2xl p-5 border border-[var(--retro-border)] bg-[var(--retro-bg-elevated)]/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center border border-cyan-400/20 flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Base44 API Gateway</h3>
                    <p className="text-sm text-[var(--retro-text-muted)] leading-relaxed">
                      These integrations are managed securely by Base44. No code required—just authenticate and the dashboard automatically syncs data across all your connected tools.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations.length === 0 ? (
                  <p className="col-span-full retro-card rounded-2xl p-8 border border-[var(--retro-border)] text-center text-sm text-[var(--retro-text-muted)]">
                    No integrations match &ldquo;{searchQuery.trim()}&rdquo;.
                  </p>
                ) : (
                  filteredIntegrations.map((integration) => {
                    const Icon = integration.icon;
                    return (
                      <div key={integration.id} className="retro-card rounded-2xl p-5 border border-[var(--retro-border)] flex flex-col h-full hover:border-[var(--retro-border-bright)] transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${integration.bg} ${integration.color} ${integration.border}`}>
                            <Icon className="w-6 h-6" aria-hidden />
                          </div>
                          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${integration.status === 'connected' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                            {integration.status}
                          </div>
                        </div>
                        <h3 className="font-bold text-base mb-1">{integration.name}</h3>
                        <p className="text-sm text-[var(--retro-text-muted)] mb-6 flex-1">{integration.desc}</p>

                        <button
                          type="button"
                          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all border ${
                            integration.status === 'connected'
                              ? 'bg-[var(--retro-bg-elevated)] text-[var(--retro-text)] border-[var(--retro-border)] hover:border-rose-400/30 hover:text-rose-400'
                              : 'retro-rgb-btn border-transparent'
                          }`}
                        >
                          {integration.status === 'connected' ? 'Disconnect (demo)' : 'Connect account (demo)'}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.section>
          ) : null}
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-detail-heading"
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
                <h2 id="order-detail-heading" className="font-extrabold text-lg">Order {selectedOrder.id}</h2>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-[var(--retro-bg-elevated)] rounded-full transition-colors"
                  aria-label="Close order details"
                >
                  <X className="w-5 h-5" aria-hidden />
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
                      <div className="flex gap-2 items-stretch">
                        <p className="text-xs font-mono text-[var(--retro-text-muted)] bg-[var(--retro-bg)] p-2 rounded-lg break-all border border-[var(--retro-border)] flex-1 min-w-0">
                          {selectedOrder.tracking}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedOrder.tracking) {
                              void navigator.clipboard?.writeText(selectedOrder.tracking);
                              setCopiedTracking(true);
                              window.setTimeout(() => setCopiedTracking(false), 2000);
                            }
                          }}
                          className="flex-shrink-0 px-3 rounded-lg border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] text-[var(--retro-text-muted)] hover:text-[var(--retro-text)] transition-colors"
                          aria-label="Copy tracking number"
                        >
                          {copiedTracking ? <Check className="w-4 h-4 text-emerald-400" aria-hidden /> : <Copy className="w-4 h-4" aria-hidden />}
                        </button>
                      </div>
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
                          <p className="font-semibold text-sm">{lookupSku(item.sku)?.name ?? item.sku}</p>
                          <p className="text-xs text-[var(--retro-text-muted)]">
                            {item.sku} · Qty {item.qty}
                          </p>
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
                      <button type="button" className="flex items-center gap-2 justify-center py-3 px-4 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-xl font-bold text-sm hover:bg-[#25D366]/20 transition-colors">
                        <MessageCircle className="w-4 h-4" aria-hidden /> WhatsApp
                      </button>
                      <button type="button" className="flex items-center gap-2 justify-center py-3 px-4 bg-zinc-800 text-white dark:bg-zinc-100 dark:text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                        <Calendar className="w-4 h-4" aria-hidden /> Add to Cal
                      </button>
                   </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    </>
  );
}
