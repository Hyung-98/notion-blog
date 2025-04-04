const Bookmark = ({
  url,
  title,
  description,
  image,
}: {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-lg overflow-hidden hover:shadow transition-all bg-white dark:bg-zinc-800 dark:border-zinc-600"
    >
      {image && <img src={image} alt={title ?? "bookmark"} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <div className="text-base font-semibold text-blue-600">{title}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{description}</div>
        <div className="text-xs text-gray-400 mt-1">{url}</div>
      </div>
    </a>
  );
};

export default Bookmark;
