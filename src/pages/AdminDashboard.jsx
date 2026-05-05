import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LogOut, Package, MessageSquare, Plus, Trash2, Edit,
  CheckCircle, XCircle, Upload, LayoutGrid, X, Save
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [enquiries, setEnquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ── Product form state ──────────────────────────────────────
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'Hardware', description: '', price: '',
    image_url: '', in_stock: true, is_featured: false
  });
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState('');

  // ── Category edit state ─────────────────────────────────────
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState('');

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin'); // Enforce auth
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { data: eqData } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (eqData) setEnquiries(eqData);

    const { data: pData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (pData) setProducts(pData);

    const { data: catData } = await supabase.from('featured_categories').select('*').order('display_order', { ascending: true });
    if (catData) setCategories(catData);

    setLoading(false);
  };

  // ── Upload helper ───────────────────────────────────────────
  const uploadImage = async (file) => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { upsert: true });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);
    return publicUrl;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  // ── Enquiry actions ─────────────────────────────────────────
  const markEnquiryRead = async (id, isRead) => {
    await supabase.from('enquiries').update({ is_read: !isRead }).eq('id', id);
    fetchData();
  };

  const deleteEnquiry = async (id) => {
    if (window.confirm('Delete this enquiry?')) {
      await supabase.from('enquiries').delete().eq('id', id);
      fetchData();
    }
  };

  // ── Product actions ─────────────────────────────────────────
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProductImageFile(file);
    setProductImagePreview(URL.createObjectURL(file));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setUploadingImage(true);
    try {
      let imageUrl = newProduct.image_url;
      if (productImageFile) imageUrl = await uploadImage(productImageFile);
      await supabase.from('products').insert([{ ...newProduct, image_url: imageUrl }]);
      setShowProductForm(false);
      setNewProduct({ name: '', category: 'Hardware', description: '', price: '', image_url: '', in_stock: true, is_featured: false });
      setProductImageFile(null);
      setProductImagePreview('');
      fetchData();
    } catch (err) {
      alert('Error saving product: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchData();
    }
  };

  // ── Category actions ────────────────────────────────────────
  const deleteCategory = async (id) => {
    if (window.confirm('Delete this category? It will no longer appear on the Home page.')) {
      await supabase.from('featured_categories').delete().eq('id', id);
      fetchData();
    }
  };

  const handleEditCategory = (cat) => {
    setEditingCategory({ ...cat });
    setCategoryImagePreview(cat.image_url || '');
    setCategoryImageFile(null);
  };

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCategoryImageFile(file);
    setCategoryImagePreview(URL.createObjectURL(file));
  };

  const handleCategorySave = async (e) => {
    e.preventDefault();
    setUploadingImage(true);
    try {
      let imageUrl = editingCategory.image_url;
      if (categoryImageFile) imageUrl = await uploadImage(categoryImageFile);
      await supabase.from('featured_categories')
        .update({
          name: editingCategory.name,
          description: editingCategory.description,
          image_url: imageUrl,
          link_to: editingCategory.link_to,
        })
        .eq('id', editingCategory.id);
      setEditingCategory(null);
      setCategoryImageFile(null);
      setCategoryImagePreview('');
      fetchData();
    } catch (err) {
      alert('Error saving category: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-20">

      {/* Sidebar */}
      <aside className="relative w-full md:w-64 bg-secondary text-white p-6 shadow-xl z-10 flex flex-col">
        <h2 className="font-display text-2xl font-bold mb-8 text-primary">Admin Panel</h2>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'products' ? 'bg-primary text-secondary font-bold' : 'hover:bg-white/10'}`}
          >
            <Package size={20} /> Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'categories' ? 'bg-primary text-secondary font-bold' : 'hover:bg-white/10'}`}
          >
            <LayoutGrid size={20} /> Featured Categories
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'enquiries' ? 'bg-primary text-secondary font-bold' : 'hover:bg-white/10'}`}
          >
            <MessageSquare size={20} /> Enquiries
            {enquiries.filter(e => !e.is_read).length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs py-1 px-2 rounded-full">
                {enquiries.filter(e => !e.is_read).length}
              </span>
            )}
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center justify-center gap-2 bg-white/10 hover:bg-red-500 hover:text-white px-4 py-3 rounded-lg transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* ═══════════════ PRODUCTS TAB ═══════════════ */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="font-display text-3xl font-bold text-secondary">Manage Products</h1>
                  <button
                    onClick={() => { setShowProductForm(!showProductForm); setProductImageFile(null); setProductImagePreview(''); }}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition flex items-center gap-2"
                  >
                    {showProductForm ? 'Cancel' : <><Plus size={20} /> Add Product</>}
                  </button>
                </div>

                {showProductForm && (
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
                    <h3 className="font-bold text-lg mb-4">Add New Product</h3>
                    <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Product Name" required className="border p-2 rounded"
                        value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />

                      <select className="border p-2 rounded" value={newProduct.category}
                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                        <option value="Hardware">Hardware</option>
                        <option value="Paints">Paints</option>
                        <option value="Waterproofing">Waterproofing</option>
                      </select>

                      <input type="text" placeholder="Price (e.g. ₹500/L)" className="border p-2 rounded"
                        value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />

                      {/* ── Image Upload ── */}
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-gray-700 mb-2">Product Image</p>
                        <div className="flex items-start gap-4 flex-wrap">
                          <label className="flex flex-col items-center justify-center w-40 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary bg-gray-50 transition">
                            <Upload size={24} className="text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500 text-center px-2">Click to Upload Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleProductImageChange} />
                          </label>
                          {productImagePreview && (
                            <div className="relative">
                              <img src={productImagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                              <button type="button"
                                onClick={() => { setProductImageFile(null); setProductImagePreview(''); }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                <X size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <textarea placeholder="Description" className="border p-2 rounded md:col-span-2" rows={3}
                        value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />

                      <div className="flex items-center gap-4 md:col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={newProduct.in_stock}
                            onChange={e => setNewProduct({ ...newProduct, in_stock: e.target.checked })} /> In Stock
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={newProduct.is_featured}
                            onChange={e => setNewProduct({ ...newProduct, is_featured: e.target.checked })} /> Featured on Home
                        </label>
                      </div>

                      <button type="submit" disabled={uploadingImage}
                        className="bg-secondary text-white py-2 rounded md:col-span-2 hover:bg-black transition disabled:opacity-60 flex items-center justify-center gap-2">
                        {uploadingImage ? 'Uploading & Saving...' : <><Save size={18} /> Save Product</>}
                      </button>
                    </form>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 font-bold text-gray-700">Product</th>
                        <th className="p-4 font-bold text-gray-700">Category</th>
                        <th className="p-4 font-bold text-gray-700">Price</th>
                        <th className="p-4 font-bold text-gray-700">Status</th>
                        <th className="p-4 font-bold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr><td colSpan="5" className="p-8 text-center text-gray-500">No products found. Add one above!</td></tr>
                      ) : (
                        products.map(p => (
                          <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4 flex items-center gap-3">
                              <img src={p.image_url || 'https://picsum.photos/seed/placeholder/50'} alt={p.name} className="w-10 h-10 rounded object-cover" />
                              <span className="font-medium">{p.name}</span>
                              {p.is_featured && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Featured</span>}
                            </td>
                            <td className="p-4">{p.category}</td>
                            <td className="p-4">{p.price || 'N/A'}</td>
                            <td className="p-4">
                              {p.in_stock
                                ? <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16} /> In Stock</span>
                                : <span className="text-red-600 flex items-center gap-1"><XCircle size={16} /> Out of Stock</span>}
                            </td>
                            <td className="p-4 flex gap-2">
                              <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={18} /></button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ═══════════════ FEATURED CATEGORIES TAB ═══════════════ */}
            {activeTab === 'categories' && (
              <div>
                <div className="mb-8">
                  <h1 className="font-display text-3xl font-bold text-secondary mb-2">Featured Categories</h1>
                  <p className="text-gray-500 text-sm">Edit the 3 featured category cards shown on the Home page.</p>
                </div>

                {categories.length === 0 ? (
                  <div className="bg-white p-8 text-center text-gray-500 rounded-xl border border-gray-200">
                    No categories found. Make sure you ran the SQL setup script.
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {categories.map(cat => (
                      <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="h-48 bg-gray-100 relative">
                          <img
                            src={cat.image_url || 'https://picsum.photos/400/300'}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg text-secondary mb-1">{cat.name}</h3>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{cat.description}</p>
                          <button
                            onClick={() => handleEditCategory(cat)}
                            className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary hover:text-white text-primary border border-primary/30 px-4 py-2 rounded-lg transition font-medium text-sm"
                          >
                            <Edit size={16} /> Edit Category
                          </button>
                          <button
                            onClick={() => deleteCategory(cat.id)}
                            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 border border-red-200 px-4 py-2 rounded-lg transition font-medium text-sm mt-2"
                          >
                            <Trash2 size={16} /> Delete Category
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Edit Category Form */}
                {editingCategory && (
                  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
                      <button
                        onClick={() => { setEditingCategory(null); setCategoryImageFile(null); setCategoryImagePreview(''); }}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                      <h2 className="font-display text-2xl font-bold text-secondary mb-6">Edit Category</h2>
                      <form onSubmit={handleCategorySave} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                          <input type="text" required className="w-full border p-2 rounded-lg"
                            value={editingCategory.name}
                            onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea className="w-full border p-2 rounded-lg" rows={2}
                            value={editingCategory.description || ''}
                            onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Link To</label>
                          <input type="text" className="w-full border p-2 rounded-lg"
                            value={editingCategory.link_to || '/products'}
                            onChange={e => setEditingCategory({ ...editingCategory, link_to: e.target.value })} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                          <div className="flex items-start gap-4">
                            <label className="flex flex-col items-center justify-center w-36 h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary bg-gray-50 transition">
                              <Upload size={22} className="text-gray-400 mb-1" />
                              <span className="text-xs text-gray-500 text-center px-2">Upload New Image</span>
                              <input type="file" accept="image/*" className="hidden" onChange={handleCategoryImageChange} />
                            </label>
                            {categoryImagePreview && (
                              <div className="relative">
                                <img src={categoryImagePreview} alt="Preview" className="w-28 h-28 object-cover rounded-lg border border-gray-200" />
                                <button type="button"
                                  onClick={() => { setCategoryImageFile(null); setCategoryImagePreview(editingCategory.image_url || ''); }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                  <X size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <button type="submit" disabled={uploadingImage}
                          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition disabled:opacity-60 flex items-center justify-center gap-2">
                          {uploadingImage ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ═══════════════ ENQUIRIES TAB ═══════════════ */}
            {activeTab === 'enquiries' && (
              <div>
                <h1 className="font-display text-3xl font-bold text-secondary mb-8">Customer Enquiries</h1>
                <div className="grid gap-4">
                  {enquiries.length === 0 ? (
                    <div className="bg-white p-8 text-center text-gray-500 rounded-xl shadow-sm border border-gray-200">No enquiries found.</div>
                  ) : (
                    enquiries.map(eq => (
                      <div key={eq.id} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${eq.is_read ? 'border-gray-300' : 'border-primary'} relative`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                              {eq.name}
                              {!eq.is_read && <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                              <span>📞 {eq.phone}</span>
                              <span>📅 {new Date(eq.created_at).toLocaleDateString()}</span>
                              {eq.product_interest && <span>🏷️ {eq.product_interest}</span>}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => markEnquiryRead(eq.id, eq.is_read)}
                              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition">
                              Mark {eq.is_read ? 'Unread' : 'Read'}
                            </button>
                            <button onClick={() => deleteEnquiry(eq.id)}
                              className="text-red-500 hover:bg-red-50 p-1.5 rounded transition">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">{eq.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
