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

// interface TestComp2Props {
//   title: string;
//   placeholder: string;
//   content: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }
// export const TestComp2 = ({
//   title,
//   placeholder,
//   content,
//   onChange,
// }: TestComp2Props) => {
//   return (
//     <>
//       <span>{title}</span>
//       <input placeholder={placeholder} value={content} onChange={onChange} />
//     </>
//   );
// };
