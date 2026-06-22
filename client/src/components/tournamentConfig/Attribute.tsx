interface AttributeProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

export const Attribute = ({ label, value, setValue }: AttributeProps) => {
  return (
    <>
      {label}:{" "}
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <br />
    </>
  );
};
