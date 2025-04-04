"use client";

import { useRouter } from "next/navigation";

const DeleteButton = ({ pageId }: { pageId: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const res = await fetch("/api/notion/delete", {
      method: "DELETE",
      body: JSON.stringify({ pageId }),
    });

    if (res.ok) {
      alert("삭제되었습니다.");
      router.push("/list");
    } else {
      const error = await res.json();
      console.error("Error deleting page:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
      Delete
    </button>
  );
};

export default DeleteButton;
