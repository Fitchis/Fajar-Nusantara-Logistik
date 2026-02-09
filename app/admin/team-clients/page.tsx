'use client';

import { useState, useEffect } from 'react';
import { TeamClient, getTeamClients, addTeamClient, updateTeamClient, deleteTeamClient } from '@/lib/storage';
import { Plus, Edit2, Trash2, X, Check, Users } from 'lucide-react';

export default function TeamClientsManagement() {
  const [items, setItems] = useState<TeamClient[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'team' | 'client'>('all');
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    type: 'team' as 'team' | 'client',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    setItems(getTeamClients());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const updated = updateTeamClient(editingId, formData);
      if (updated) {
        setItems(getTeamClients());
      }
    } else {
      addTeamClient(formData);
      setItems(getTeamClients());
    }

    resetForm();
  };

  const handleEdit = (item: TeamClient) => {
    setFormData({
      name: item.name,
      position: item.position,
      type: item.type,
      description: item.description || '',
      imageUrl: item.imageUrl || '',
    });
    setEditingId(item.id);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteTeamClient(id);
      setItems(getTeamClients());
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      type: 'team',
      description: '',
      imageUrl: '',
    });
    setEditingId(null);
    setIsOpen(false);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const teamCount = items.filter((i) => i.type === 'team').length;
  const clientCount = items.filter((i) => i.type === 'client').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Team & Clients</h1>
          <p className="text-slate-600 mt-1">Manage team members and clients</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition"
        >
          <Plus className="w-5 h-5" />
          Add Entry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Team Members</p>
          <p className="text-3xl font-bold text-blue-900 mt-1">{teamCount}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium">Clients</p>
          <p className="text-3xl font-bold text-purple-900 mt-1">{clientCount}</p>
        </div>
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingId ? 'Edit Entry' : 'Add Entry'}
              </h2>
              <button onClick={resetForm} className="text-slate-500 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as 'team' | 'client',
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="team">Team Member</option>
                  <option value="client">Client</option>
                </select>
              </div>

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
                  {formData.type === 'team' ? 'Position' : 'Company/Title'}
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
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
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
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
                />
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

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white rounded-lg shadow p-1 w-fit">
        {(['all', 'team', 'client'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded transition font-medium text-sm ${
              filter === f
                ? 'bg-brand text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {f === 'all' && 'All'}
            {f === 'team' && 'Team Members'}
            {f === 'client' && 'Clients'}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p>No entries found. Add one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {item.imageUrl ? (
                  <div className="aspect-square bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg?height=300&width=300';
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <Users className="w-12 h-12 text-slate-400" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        item.type === 'team'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      {item.type === 'team' ? 'Team' : 'Client'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    {item.position}
                  </p>
                  {item.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 flex items-center justify-center gap-1 text-blue-600 hover:bg-blue-50 py-1 rounded transition text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
