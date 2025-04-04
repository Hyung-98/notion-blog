"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePostFormStore } from "@/app/types/store/usePostFormStore";

const EditPage = () => {
  const { pageId } = useParams() as { pageId: string };
  const router = useRouter();
  const { title, description, slug, tags, bodyText, setField, resetForm } = usePostFormStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/notion/fetch?pageId=${pageId}`);
      const data = await res.json();

      if (res.ok) {
        setField("title", data.title);
        setField("description", data.description);
        setField("slug", data.slug);
        setField("tags", data.tags);
        setField("bodyText", data.bodyText);
      } else {
        alert("데이터 불러오기 실패");
        router.push("/list");
      }
    })();
  }, [pageId]);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await fetch("/api/notion/update", {
      method: "PATCH",
      body: JSON.stringify({ pageId, title, description, slug, tags, bodyText }),
    });

    if (res.ok) {
      resetForm();
      router.push("/list");
    } else {
      alert("수정 실패");
    }
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">글 수정</h1>

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

      <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "수정 중..." : "수정하기"}
      </button>
    </main>
  );
};

export default EditPage;
