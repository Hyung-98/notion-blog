"use client";

import { usePostFormStore } from "@/app/types/store/usePostFormStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePage = () => {
  const { title, description, slug, tags, bodyText, setField, resetForm } = usePostFormStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/notion/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        slug,
        tags,
        bodyText,
      }),
    });

    if (res.ok) {
      resetForm();
      router.push("/list");
    } else {
      const error = await res.json();
      console.error("Error creating page:", error);
    }
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">새 글 등록</h1>

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setField("title", e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3"
      />
      <input
        type="text"
        placeholder="슬러그"
        value={slug}
        onChange={(e) => setField("slug", e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3"
      />
      <textarea
        placeholder="설명"
        value={description}
        onChange={(e) => setField("description", e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3"
      />
      <input
        type="text"
        placeholder="태그 (쉼표로 구분)"
        value={tags.join(",")}
        onChange={(e) =>
          setField(
            "tags",
            e.target.value.split(",").map((t) => t.trim())
          )
        }
        className="w-full border px-3 py-2 rounded mb-6"
      />
      <textarea
        placeholder="상세 내용 (본문)"
        value={bodyText}
        onChange={(e) => setField("bodyText", e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4 h-40 resize-none"
      />

      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "등록 중..." : "등록하기"}
      </button>
    </main>
  );
};

export default CreatePage;
