'use client';

import { useState, useEffect } from 'react';
import { ContactSubmission, getContactSubmissions, markContactAsRead, deleteContactSubmission } from '@/lib/storage';
import { Eye, EyeOff, Trash2, X, Mail, Phone, User, Calendar } from 'lucide-react';

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterRead, setFilterRead] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    setSubmissions(getContactSubmissions());
  }, []);

  const handleMarkAsRead = (id: string) => {
    const updated = markContactAsRead(id);
    if (updated) {
      setSubmissions(getContactSubmissions());
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      deleteContactSubmission(id);
      setSubmissions(getContactSubmissions());
      if (selectedId === id) {
        setSelectedId(null);
      }
    }
  };

  const selected = submissions.find((s) => s.id === selectedId);

  const filteredSubmissions = submissions.filter((s) => {
    if (filterRead === 'unread') return !s.read;
    if (filterRead === 'read') return s.read;
    return true;
  });

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Submissions</h1>
          <p className="text-slate-600 mt-1">
            View and manage incoming contact messages
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white rounded-lg shadow p-1 w-fit">
        {(['all', 'unread', 'read'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setFilterRead(filter)}
            className={`px-4 py-2 rounded transition font-medium text-sm ${
              filterRead === filter
                ? 'bg-brand text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
            {filter === 'unread' && ` (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredSubmissions.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                <Mail className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p>No submissions found</p>
              </div>
            ) : (
              <div className="divide-y max-h-96 overflow-y-auto">
                {filteredSubmissions.map((submission) => (
                  <button
                    key={submission.id}
                    onClick={() => {
                      setSelectedId(submission.id);
                      if (!submission.read) {
                        handleMarkAsRead(submission.id);
                      }
                    }}
                    className={`w-full text-left p-4 hover:bg-slate-50 transition ${
                      selectedId === submission.id ? 'bg-blue-50 border-l-4 border-brand' : ''
                    } ${!submission.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start gap-2">
                      {!submission.read && (
                        <div className="w-2 h-2 bg-brand rounded-full mt-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {submission.name}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {submission.email}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selected.name}
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Received: {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-600">Email</p>
                    <p className="font-medium text-slate-900 break-all">
                      {selected.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-600">Phone</p>
                    <p className="font-medium text-slate-900">
                      {selected.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Message</h3>
                <div className="bg-slate-50 rounded-lg p-4 text-slate-700 whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => {
                    const subject = `Re: Contact from ${selected.name}`;
                    const body = `Thanks for reaching out! We'll get back to you soon.`;
                    window.location.href = `mailto:${selected.email}?subject=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`;
                  }}
                  className="flex-1 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </button>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center text-slate-500 h-full flex items-center justify-center">
              <div>
                <Mail className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>Select a submission to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
