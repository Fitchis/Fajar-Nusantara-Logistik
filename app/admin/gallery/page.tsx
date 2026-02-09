'use client';

import { useState, useEffect } from 'react';
import { GalleryImage, getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/lib/storage';
import { Plus, Edit2, Trash2, X, Check, Image as ImageIcon } from 'lucide-react';

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'equipment',
  });

  const categories = ['equipment', 'vehicles', 'team', 'operations', 'other'];

  useEffect(() => {
    setImages(getGalleryImages());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const updated = updateGalleryImage(editingId, formData);
      if (updated) {
        setImages(getGalleryImages());
      }
    } else {
      addGalleryImage(formData);
      setImages(getGalleryImages());
    }

    resetForm();
  };

  const handleEdit = (image: GalleryImage) => {
    setFormData({
      title: image.title,
      description: image.description,
      imageUrl: image.imageUrl,
      category: image.category,
    });
    setEditingId(image.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(id);
      setImages(getGalleryImages());
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', imageUrl: '', category: 'equipment' });
    setEditingId(null);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gallery</h1>
          <p className="text-slate-600 mt-1">Manage gallery images</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition"
        >
          <Plus className="w-5 h-5" />
          Add Image
        </button>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Image' : 'Add Image'}
              </h2>
              <button onClick={resetForm} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {formData.imageUrl && (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg?height=160&width=300';
                    }}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-brand text-white py-2 rounded-lg hover:bg-brand-dark transition flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {images.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p>No images yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-square bg-slate-100 overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg?height=300&width=300';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {image.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                    {image.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2 py-1 bg-slate-100 text-xs font-medium text-slate-700 rounded">
                      {image.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(image)}
                      className="flex-1 flex items-center justify-center gap-1 text-blue-600 hover:bg-blue-50 py-1 rounded transition text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="flex-1 flex items-center justify-center gap-1 text-red-600 hover:bg-red-50 py-1 rounded transition text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
