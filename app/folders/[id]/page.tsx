"use client";

import { use, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Trash2,
} from "lucide-react";

type FolderPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type UploadedFile = {
  id: number;
  name: string;
  size: string;
  type: string;
  url: string;
};

export default function FolderPage({
  params,
}: FolderPageProps) {
  const { id } = use(params);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<
    UploadedFile[]
  >([]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = event.target.files;

    if (!uploadedFiles) return;

    const formattedFiles = Array.from(
      uploadedFiles
    ).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(
        file.size /
        1024 /
        1024
      ).toFixed(2)} MB`,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => [
      ...prev,
      ...formattedFiles,
    ]);
  };

  const handleDeleteFile = (
    id: number
  ) => {
    setFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-[#F3EAF8] p-10">
      {/* TOP BAR */}
      <div className="mb-12 flex items-center justify-between">
        <div>
          <Link
            href="/folders"
            className="mb-5 inline-flex items-center gap-2 text-lg font-medium text-[#6B7280] transition hover:text-black"
          >
            <ArrowLeft size={22} />
            Back
          </Link>

          <h1 className="text-5xl font-bold text-[#151C27]">
            Folder {id}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleUploadClick}
          className="flex items-center gap-3 rounded-2xl bg-[#A46BF5] px-6 py-4 text-lg font-medium text-white shadow-lg transition hover:scale-105 hover:bg-[#8B5CF6]"
        >
          <Upload size={24} />
          Upload File
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.ppt,.pptx"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* FILES SECTION */}
      <section>
        <h2 className="mb-8 text-3xl font-semibold text-[#151C27]">
          Uploaded Files
        </h2>

        {files.length === 0 ? (
          <div className="rounded-[32px] border-2 border-dashed border-[#D6C1F3] bg-white/60 p-16 text-center">
            <p className="text-xl text-[#6B7280]">
              No files uploaded yet.
            </p>

            <p className="mt-3 text-base text-[#9CA3AF]">
              Upload PDF, DOCX, PPT, or PPTX
              files to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {files.map((file) => (
              <article
                key={file.id}
                className="flex items-center justify-between rounded-[28px] bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-[#151C27]">
                    {file.name}
                  </h3>

                  <p className="mt-2 text-base text-[#6B7280]">
                    {file.size}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-[#EEE5FC] px-5 py-3 text-lg font-medium text-[#8B5CF6] transition hover:bg-[#DCC7FA]"
                  >
                    Open
                  </a>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteFile(file.id)
                    }
                    className="rounded-2xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}