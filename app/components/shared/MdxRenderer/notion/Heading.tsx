type HeadingProps = {
  level?: 1 | 2 | 3;
  children: string;
};

const Heading = ({ level = 1, children }: HeadingProps) => {
  const Tag = `h${level}` as const;
  const classMap = {
    1: "text-3xl font-bold",
    2: "text-2xl font-semibold",
    3: "text-xl font-medium",
  };
  return <Tag className={`${classMap[level]} mt-6 mb-2`}>{children}</Tag>;
};
export default Heading;
