"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} from "@/app/dashboard/services/api";

export default function CategoriesPage() {
  // ✅ FETCH
  const { data: fetchedCategories, isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  // ✅ MAP DATA (NO useEffect)
  const categories =
    fetchedCategories?.map((c) => ({
      id: c._id || c.id || c.slug,
      name: c.name,
      description: c.description || "",
      image: c.thumbnail || "",
    })) || [];

  // ------------------ ADD STATE ------------------
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState("");

  // ------------------ EDIT STATE ------------------
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImagePreview, setEditImagePreview] = useState("");

  // ------------------ IMAGE HANDLER ------------------
  const handleNewImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImageFile(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  const handleEditImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImagePreview(URL.createObjectURL(file));
  };

  // ------------------ ADD CATEGORY ------------------
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      alert("Category name required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newName);
    formData.append("description", newDescription);

    const slug = newName.toLowerCase().replace(/\s+/g, "-");
    formData.append("slug", slug);

    if (newImageFile) formData.append("thumbnail", newImageFile);

    try {
      await createCategory(formData).unwrap();

      // reset
      setNewName("");
      setNewDescription("");
      setNewImageFile(null);
      setNewImagePreview("");
      setShowAdd(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    }
  };

  // ------------------ EDIT ------------------
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description);
    setEditImagePreview(cat.image);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setEditImagePreview("");
  };

  const saveEdit = () => {
    alert("Backend edit API lagbe এখানে 🔥");
    setEditingId(null);
  };

  // ------------------ DELETE ------------------
  const deleteCategory = (id) => {
    alert("Backend delete API lagbe 🔥");
  };

  // ------------------ UI ------------------
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 fixed left-0 top-0 h-full bg-white border-r">
        <Sidebar />
      </div>

      {/* RIGHT */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* NAVBAR */}
        <div className="sticky top-0 bg-white border-b z-50">
          <Navbar />
        </div>

        {/* CONTENT */}
        <main className="p-6">
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold">Categories</h1>

            <button
              onClick={() => setShowAdd(!showAdd)}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              {showAdd ? "Close" : "Add Category"}
            </button>
          </div>

          {/* ADD FORM */}
          {showAdd && (
            <form
              onSubmit={handleAdd}
              className="bg-white p-4 rounded shadow mb-5 grid grid-cols-3 gap-4"
            >
              <div className="col-span-2">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Category name"
                  className="w-full border p-2 mb-2"
                />

                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full border p-2"
                />
              </div>

              <div>
                <div className="w-32 h-32 bg-gray-100 mb-2 flex items-center justify-center">
                  {newImagePreview ? (
                    <img
                      src={newImagePreview}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </div>

                <input type="file" onChange={handleNewImage} />

                <div className="flex gap-2 mt-3">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-3 py-2 rounded"
                  >
                    {isCreating ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="border px-3 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TABLE */}
          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-t">
                    <td className="p-3">
                      {editingId === cat.id ? (
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border px-2 py-1"
                        />
                      ) : (
                        cat.name
                      )}
                    </td>

                    <td className="p-3">
                      {editingId === cat.id ? (
                        <input
                          value={editDescription}
                          onChange={(e) =>
                            setEditDescription(e.target.value)
                          }
                          className="border px-2 py-1"
                        />
                      ) : (
                        cat.description
                      )}
                    </td>

                    <td className="p-3">
                      <div className="w-20 h-12 bg-gray-100">
                        <img
                          src={editImagePreview || cat.image}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {editingId === cat.id && (
                        <input
                          type="file"
                          onChange={handleEditImage}
                          className="text-xs mt-1"
                        />
                      )}
                    </td>

                    <td className="p-3 text-right">
                      {editingId === cat.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="bg-green-600 text-white px-3 py-1 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="border px-3 py-1"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(cat)}
                            className="text-blue-600 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCategory(cat.id)}
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}

                {categories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      {isLoading ? "Loading..." : "No Categories"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}