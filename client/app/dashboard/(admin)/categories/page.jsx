"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useGetCategoriesQuery, useCreateCategoryMutation } from '@/app/dashboard/services/api'

export default function CategoriesPage() {
  const { data: fetchedCategories = [], refetch, isLoading: isFetching, error: fetchError } = useGetCategoriesQuery()
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()


  const [categories, setCategories] = useState([])

  const [showAdd, setShowAdd] = useState(false);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState("");

  useEffect(() => {
    return () => {
      if (newImagePreview) URL.revokeObjectURL(newImagePreview);
      if (editImagePreview) URL.revokeObjectURL(editImagePreview);
    };
  }, [newImagePreview, editImagePreview]);

  // when fetched categories change, map them into local state shape
  useEffect(() => {
    if (Array.isArray(fetchedCategories)) {
      const mapped = fetchedCategories.map((c) => ({
        id: c._id || c.id || c.slug,
        name: c.name,
        description: c.description || "",
        image: c.thumbnail || "",
        raw: c,
      }))
      setCategories(mapped)
    }
  }, [fetchedCategories])

  const handleNewImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setNewImageFile(file);
    setNewImagePreview(url);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const formData = new FormData()
    formData.append('name', newName.trim())
    formData.append('description', newDescription.trim())
    const slug = newName.trim().toLowerCase().replace(/\s+/g, '-')
    formData.append('slug', slug)
    if (newImageFile) formData.append('thumbnail', newImageFile)

    try {
      await createCategory(formData).unwrap()
      // clear local form — list will refresh due to invalidatesTags
      setNewName("")
      setNewDescription("")
      setNewImageFile(null)
      setNewImagePreview("")
      setShowAdd(false)
    } catch (err) {
      console.error("Create category failed", err)
      // optionally show UI feedback here
    }
  }

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description);
    setEditImagePreview(cat.image || "");
    setEditImageFile(null);
  };

  const handleEditImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setEditImageFile(file);
    setEditImagePreview(url);
  };

  const saveEdit = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: editName, description: editDescription, image: editImagePreview } : c))
    );
    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setEditImageFile(null);
    setEditImagePreview("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setEditImageFile(null);
    setEditImagePreview("");
  };

  const deleteCategory = (id) => {
    if (!confirm("Delete this category?")) return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col ml-64">
          <Navbar adminName="Admin User" />

          <main className="p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAdd((s) => !s)}
                  className="bg-green-600 text-white px-3 py-2 rounded-md text-sm"
                >
                  {showAdd ? "Close" : "Add Category"}
                </button>
              </div>
            </div>

            {showAdd && (
              <form onSubmit={handleAdd} className="bg-white shadow rounded-lg p-4 mb-6 grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Category name"
                    className="w-full border rounded px-3 py-2 mb-2"
                  />
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full border rounded px-3 py-2 h-24"
                  />
                </div>

                <div className="flex flex-col gap-2 items-start">
                  <label className="text-sm text-gray-600">Image</label>

                  <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {newImagePreview ? (
                      <img src={newImagePreview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>

                  <input type="file" accept="image/*" onChange={handleNewImage} />

                  <div className="mt-auto w-full flex gap-2">
                    <button type="submit" className="bg-indigo-600 text-white px-3 py-2 rounded">
                      Save
                    </button>
                    <button type="button" onClick={() => setShowAdd(false)} className="border px-3 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">Image</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-100">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{cat.id}</td>

                        <td className="px-4 py-3 text-sm text-gray-700">
                          {editingId === cat.id ? (
                            <input value={editName} onChange={(e) => setEditName(e.target.value)} className="border rounded px-2 py-1 w-48" />
                          ) : (
                            cat.name
                          )}
                        </td>

                        <td className="px-4 py-3 text-sm text-gray-700">
                          {editingId === cat.id ? (
                            <input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="border rounded px-2 py-1 w-64" />
                          ) : (
                            <span className="text-sm text-gray-500">{cat.description}</span>
                          )}
                        </td>

                        <td className="px-4 py-3">
                          <div className="w-20 h-12 bg-gray-100 rounded overflow-hidden">
                            {editingId === cat.id ? (
                              editImagePreview ? (
                                <img src={editImagePreview} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-gray-400 text-xs p-2">No image</span>
                              )
                            ) : cat.image ? (
                              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-400 text-xs p-2">No image</span>
                            )}
                          </div>

                          {editingId === cat.id && (
                            <input type="file" accept="image/*" onChange={handleEditImage} className="mt-1 text-xs" />
                          )}
                        </td>

                        <td className="px-4 py-3 text-sm text-right">
                          {editingId === cat.id ? (
                            <>
                              <button onClick={() => saveEdit(cat.id)} className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                                Save
                              </button>
                              <button onClick={cancelEdit} className="border px-3 py-1 rounded">
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEdit(cat)} className="text-indigo-600 hover:underline mr-3">
                                Edit
                              </button>
                              <button onClick={() => deleteCategory(cat.id)} className="text-red-600 hover:underline">
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}

                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-gray-500">
                          No categories
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
