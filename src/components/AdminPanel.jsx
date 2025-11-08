import React, { useMemo, useState } from 'react';

const extractDriveId = (url) => {
  if (!url) return '';
  // Handle typical formats
  const patterns = [
    /https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{10,})/,
    /https?:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]{10,})/,
    /https?:\/\/drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]{10,})/,
    /id=([a-zA-Z0-9_-]{10,})/, // fallback query param
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m && m[1]) return m[1];
  }
  return '';
};

const AdminPanel = ({ onSubmit, darkMode }) => {
  const [form, setForm] = useState({
    driveLink: '',
    title: '',
    description: '',
    category: 'Latest',
    language: 'English',
    thumbnail: '',
  });

  const fileId = useMemo(() => extractDriveId(form.driveLink), [form.driveLink]);
  const previewUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileId) {
      alert('Could not extract Google Drive file ID. Please check the link.');
      return;
    }
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      language: form.language.trim(),
      thumbnail: form.thumbnail.trim(),
      driveId: fileId,
      previewUrl,
    };
    onSubmit(payload);
  };

  return (
    <div className={`rounded-lg border p-4 ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
      <h3 className="font-semibold mb-3">Admin Upload</h3>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Google Drive Link</label>
            <input
              type="url"
              required
              name="driveLink"
              value={form.driveLink}
              onChange={handleChange}
              placeholder="Paste shared link here"
              className={`w-full rounded-md border px-3 py-2 text-sm ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-300'}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                required
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-300'}`}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Language</label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-300'}`}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-300'}`}
            >
              <option>Latest</option>
              <option>Hindi</option>
              <option>English</option>
              <option>Action</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Thriller</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Thumbnail URL</label>
            <input
              type="url"
              required
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-300'}`}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className={`w-full rounded-md border px-3 py-2 text-sm ${darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-300'}`}
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500">Add Movie</button>
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Preview</label>
          <div className={`aspect-video w-full rounded-md overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
            {previewUrl ? (
              <iframe
                src={previewUrl}
                title="Google Drive Preview"
                allow="autoplay"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm opacity-60">Paste a valid Google Drive link</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;
