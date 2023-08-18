interface TestCompProps {
  title: string;
  placeholder: string;
  content: string;
  setContent: (v: string) => void;
}

export const TestComp = ({
  title,
  placeholder,
  content,
  setContent,
}: TestCompProps) => {
  return (
    <>
      <span>{title}</span>
      <input
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </>
  );
};
