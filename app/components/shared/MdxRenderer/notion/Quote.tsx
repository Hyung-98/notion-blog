const Quote = ({ children }: { children: string }) => {
  return (
    <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  );
};

export default Quote;
