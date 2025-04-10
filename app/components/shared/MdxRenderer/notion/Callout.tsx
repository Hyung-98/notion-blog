type CalloutProps = {
  emoji?: string;
  children: React.ReactNode;
};

const Callout = ({ children, emoji }: CalloutProps) => {
  return (
    <div className="flex items-start gap-3 p-4 rounded-md border bg-blue-50 border-blue-300">
      <span className="text-xl">{emoji ?? "💡"}</span>
      <div className="text-sm">{children}</div>
    </div>
  );
};

export default Callout;
