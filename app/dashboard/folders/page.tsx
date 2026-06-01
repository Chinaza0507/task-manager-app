"use client";

import { useState } from "react";
import { Plus, X, Pin, Pencil, Trash2 } from "lucide-react";

function FolderIcon() {
  return (
    <svg
      width="140"
      height="120"
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-4 drop-shadow-sm"
    >
      <path
        d="M2 18C2 9.16344 9.16344 2 18 2H54.5858C58.8296 2 62.8995 3.68571 65.8995 6.68629L74.1005 14.8873C77.1005 17.8879 81.1704 19.5736 85.4142 19.5736H122C130.837 19.5736 138 26.737 138 35.5736V102C138 110.837 130.837 118 122 118H18C9.16344 118 2 110.837 2 102V18Z"
        fill="#D9C8FF"
        stroke="#374151"
        strokeWidth="4"
      />
      <line x1="2" y1="28" x2="138" y2="28" stroke="#374151" strokeWidth="4" />
      <line
        x1="32"
        y1="65"
        x2="80"
        y2="65"
        stroke="#374151"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="85"
        x2="108"
        y2="85"
        stroke="#374151"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

type FolderData = {
  id: string;
  title: string;
  description: string;
  isPinned?: boolean;
};

const initialFolders: FolderData[] = [
  {
    id: "1",
    title: "MTH 202",
    description:
      "Limits, differentiation, integration notes, and solved examples.",
  },
  {
    id: "2",
    title: "React practice projects",
    description: "Mini apps, components, hooks practice, and UI experiments.",
  },
  {
    id: "3",
    title: "CSC 212",
    description:
      "Programming exercises, coding tasks, and submission deadlines for CSC 212.",
  },
  {
    id: "4",
    title: "Javascript coding challenges",
    description: "Beginner scripts, logic problems, and debugging exercises.",
  },
  {
    id: "5",
    title: "INS 204",
    description: "ER diagrams, SQL practice, normalization, and lecture notes.",
  },
  {
    id: "6",
    title: "Cybersecurity Fundamentals",
    description:
      "Network safety notes, encryption basics, threat concepts, and practice exercises.",
  },
];

export default function FoldersPage() {
  const [folders, setFolders] = useState<FolderData[]>(initialFolders);

  // Modal and form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Sort folders to keep pinned ones at the top of the grid
  const sortedFolders = [...folders].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingId(null);
    setNewTitle("");
    setNewDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (folder: FolderData) => {
    setModalMode("edit");
    setEditingId(folder.id);
    setNewTitle(folder.title);
    setNewDescription(folder.description);
    setIsModalOpen(true);
  };

  const handleSaveFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (modalMode === "edit" && editingId) {
      setFolders((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? {
                ...f,
                title: newTitle.trim(),
                description: newDescription.trim(),
              }
            : f,
        ),
      );
    } else {
      const newFolder: FolderData = {
        id: Date.now().toString(),
        title: newTitle.trim(),
        description: newDescription.trim(),
        isPinned: false,
      };
      setFolders([...folders, newFolder]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this folder?")) {
      setFolders((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleTogglePin = (id: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isPinned: !f.isPinned } : f)),
    );
  };

  return (
    <div className="pt-0 pb-24 relative min-h-[calc(100vh-76px)]">
      <div className="mb-4 -mt-10">
        <h1 className="text-[48px] font-bold text-[#111827] mb-2">
          📁 Folders
        </h1>
        <p className="text-[#6B7280] text-[14px]">
          Organize your academic files, assignments, and study materials in one
          place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mt-6">
        {" "}
        {sortedFolders.map((folder) => (
          <div
            key={folder.id}
            className="group relative flex flex-col p-4 -m-4 rounded-2xl transition-all duration-300 hover:scale-[102%] hover:bg-[#F5F3FF] hover:shadow-sm"
          >
            {folder.isPinned && (
              <div className="absolute top-6 left-6 text-[#8B5CF6] z-10">
                <Pin size={20} fill="currentColor" />
              </div>
            )}

            {/* Hover Actions */}
            <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
              <button
                onClick={() => handleTogglePin(folder.id)}
                className="p-2 bg-white border border-[#E7E1F2] rounded-full shadow-sm hover:bg-[#F3E8FF] text-[#8B5CF6] transition-colors"
                title={folder.isPinned ? "Unpin folder" : "Pin folder"}
              >
                <Pin
                  size={16}
                  fill={folder.isPinned ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={() => handleOpenEditModal(folder)}
                className="p-2 bg-white border border-[#E7E1F2] rounded-full shadow-sm hover:bg-[#F3E8FF] text-[#8B5CF6] transition-colors"
                title="Rename folder"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(folder.id)}
                className="p-2 bg-white border border-[#E7E1F2] rounded-full shadow-sm hover:bg-red-50 text-red-600 transition-colors"
                title="Delete folder"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <FolderIcon />
            <h3 className="text-[18px] font-semibold text-[#111827] leading-tight mb-2 px-1">
              {folder.title}
            </h3>
            <p className="text-[#6B7280] text-[13px] leading-relaxed px-1">
              {folder.description}
            </p>
          </div>
        ))}
      </div>

      {/* Global Add Folder Button */}
      <button
        onClick={handleOpenCreateModal}
        className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-[#A78BFA] text-white flex items-center justify-center shadow-lg hover:bg-[#8B5CF6] transition-colors z-30"
        aria-label="Create new folder"
      >
        <Plus size={32} strokeWidth={1.5} />
      </button>

      {/* Reusable Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#111827]">
                {modalMode === "edit" ? "Rename Folder" : "Create New Folder"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B7280] hover:text-[#111827] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFolder} className="space-y-4">
              <div>
                <label
                  htmlFor="folder-title"
                  className="block text-[13px] font-semibold text-[#374151] mb-1"
                >
                  Folder Title
                </label>
                <input
                  id="folder-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. History 101"
                  className="w-full h-10 px-3 rounded-xl border border-[#D1D5DB] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] text-[14px]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="folder-desc"
                  className="block text-[13px] font-semibold text-[#374151] mb-1"
                >
                  Description (optional)
                </label>
                <textarea
                  id="folder-desc"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Brief description of contents..."
                  className="w-full p-3 rounded-xl border border-[#D1D5DB] focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] text-[14px] min-h-[100px] resize-y"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#4B5563] font-semibold text-[14px] hover:bg-[#F3F4F6] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6] text-white font-semibold text-[14px] hover:bg-[#7C3AED] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {modalMode === "edit" ? "Save Changes" : "Create Folder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
