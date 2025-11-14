"use client";
import React, { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  available?: boolean;
  image?: string;
};

type Order = {
  id: string;
  productId: string;
  productName?: string;
  quantity: number;
  total: number;
  status: string;
  createdAt: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  // Filters
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("newest");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        setErrorProducts(null);
        const res = await fetch("https://products-management-service-latest.onrender.com/products");
        if (!res.ok) throw new Error(`Products fetch failed: ${res.status}`);
        const data = await res.json();
        setProducts(data || []);
      } catch (err: any) {
        setErrorProducts(err.message || "Unknown error");
      } finally {
        setLoadingProducts(false);
      }
    }

    async function fetchOrders() {
      try {
        setLoadingOrders(true);
        setErrorOrders(null);
        const res = await fetch("https://orders-management-service-latest.onrender.com/orders");
        if (!res.ok) throw new Error(`Orders fetch failed: ${res.status}`);
        const data = await res.json();
        setOrders(data || []);
      } catch (err: any) {
        setErrorOrders(err.message || "Unknown error");
      } finally {
        setLoadingOrders(false);
      }
    }

    fetchProducts();
    fetchOrders();
  }, []);

  // derive categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || (p.description || "").toLowerCase().includes(s));
    }
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (inStockOnly) list = list.filter((p) => p.available);
    if (maxPrice != null) list = list.filter((p) => p.price <= maxPrice);

    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "oldest") list.sort((a, b) => (a.id > b.id ? 1 : -1));
    else list.sort((a, b) => (a.id > b.id ? -1 : 1)); // newest default (by id/time)

    return list;
  }, [products, q, category, inStockOnly, sort, maxPrice]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {/* <div className="text-indigo-600 font-bold text-xl">Products & Orders</div> */}
              <div className="hidden sm:flex items-center text-sm text-gray-500 bg-indigo-50 px-3 py-1 rounded-full">Analytics • Orders • Products</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center bg-white border rounded-lg px-2 py-1 text-sm shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  <input className="outline-none text-sm" placeholder="Search products, orders..." value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-2 rounded-md px-3 py-1 hover:bg-gray-100">
                  <img src="https://i.pravatar.cc/40" alt="avatar" className="h-8 w-8 rounded-full" />
                  <div className="hidden sm:block text-sm text-gray-700">Joy Singh</div>
                </button>

                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transform -translate-y-1 group-hover:translate-y-0 transition-all">
                  <div className="p-3">
                    <div className="font-semibold">Joy Singh</div>
                    <div className="text-xs text-gray-500">joy@example.com</div>
                  </div>
                  <div className="border-t" />
                  <ul className="p-2">
                    <li className="p-2 hover:bg-gray-50 rounded">Profile</li>
                    <li className="p-2 hover:bg-gray-50 rounded">Settings</li>
                    <li className="p-2 hover:bg-gray-50 rounded text-red-600">Logout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Search</label>
                <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" placeholder="Search product name or description" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                <select className="w-full border rounded px-3 py-2 text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input id="instock" type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="h-4 w-4" />
                <label htmlFor="instock" className="text-sm text-gray-700">In stock only</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Max price</label>
                <input type="number" className="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. 100" value={maxPrice ?? ""} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sort</label>
                <select className="w-full border rounded px-3 py-2 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                </select>
              </div>

              <div className="pt-3">
                <button onClick={() => { setQ(""); setCategory("All"); setInStockOnly(false); setMaxPrice(null); setSort("newest"); }} className="w-full bg-indigo-600 text-white py-2 rounded-md">Reset Filters</button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <div className="text-sm text-gray-500">Showing {filtered.length} products</div>
              </div>

              {loadingProducts ? (
                <div className="py-12 text-center text-gray-500">Loading products...</div>
              ) : errorProducts ? (
                <div className="py-8 text-red-600">Error: {errorProducts}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((p) => (
                    <article key={p.id} className="flex flex-col bg-white border rounded-lg overflow-hidden shadow-sm">
                      <div className="h-44 bg-gray-100 flex items-center justify-center">
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt={p.name} className="object-cover h-full w-full" />
                        ) : (
                          <div className="text-gray-400">No Image</div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-md">{p.name}</h3>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-3">{p.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="font-semibold">₹{p.price.toFixed(2)}</div>
                          <div className={`text-sm px-2 py-1 rounded ${p.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.available ? 'In stock' : 'Out of stock'}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <div className="text-sm text-gray-500">Total orders: {orders.length}</div>
              </div>

              {loadingOrders ? (
                <div className="py-12 text-center text-gray-500">Loading orders...</div>
              ) : errorOrders ? (
                <div className="py-8 text-red-600">Error: {errorOrders}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium">Order ID</th>
                        <th className="px-4 py-2 text-left font-medium">Product</th>
                        <th className="px-4 py-2 text-left font-medium">Qty</th>
                        <th className="px-4 py-2 text-left font-medium">Total</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">{o.id.slice(0, 8)}</td>
                          <td className="px-4 py-3">{o.productName || o.productId}</td>
                          <td className="px-4 py-3">{o.quantity}</td>
                          <td className="px-4 py-3">₹{o.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs ${o.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">{new Date(o.createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-6">© {new Date().getFullYear()} PO — Joy Singh</footer>
    </div>
  );
}
