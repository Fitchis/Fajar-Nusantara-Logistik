'use client';

import { useState, useEffect } from 'react';
import { Testimonial, getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/storage';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    rating: 5,
    text: '',
  });

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const updated = updateTestimonial(editingId, formData);
      if (updated) {
        setTestimonials(getTestimonials());
      }
    } else {
      addTestimonial(formData);
      setTestimonials(getTestimonials());
    }

    resetForm();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      name: testimonial.name,
      company: testimonial.company,
      rating: testimonial.rating,
      text: testimonial.text,
    });
    setEditingId(testimonial.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
      setTestimonials(getTestimonials());
    }
  };

  const resetForm = () => {
    setFormData({ name: '', company: '', rating: 5, text: '' });
    setEditingId(null);
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Testimonials</h1>
          <p className="text-slate-600 mt-1">Manage customer testimonials</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={resetForm} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Rating
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: parseInt(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {'⭐'.repeat(r)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Testimonial
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

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

      {/* Testimonials List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {testimonials.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p>No testimonials yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                    Text
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {testimonial.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {testimonial.company}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {'⭐'.repeat(testimonial.rating)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                      {testimonial.text}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
