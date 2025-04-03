type RichText = {
  plain_text: string;
  href?: string | null;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    code?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
  };
};

export default function Paragraph({ texts }: { texts: RichText[] }) {
  if (!texts.length) return null;

  return (
    <p className="text-base leading-7 text-gray-800 dark:text-gray-200">
      {texts.map((text, idx) => {
        const style = [
          text.annotations?.bold ? "font-bold" : "",
          text.annotations?.italic ? "italic" : "",
          text.annotations?.underline ? "underline" : "",
          text.annotations?.code ? "px-1 py-0.5 rounded bg-gray-100 dark:bg-zinc-700 font-mono text-sm" : "",
        ]
          .filter(Boolean)
          .join(" ");

        if (text.href) {
          return (
            <a
              key={idx}
              href={text.href}
              className={`${style} text-blue-600 underline hover:text-blue-800`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {text.plain_text}
            </a>
          );
        }

        return (
          <span key={idx} className={style}>
            {text.plain_text}
          </span>
        );
      })}
    </p>
  );
}
