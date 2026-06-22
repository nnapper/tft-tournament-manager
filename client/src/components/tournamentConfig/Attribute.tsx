export const Attribute = (props: {
  label: string;
  value: number;
  setValue: (value: number) => void;
}) => {
  return (
    <>
      {props.label}:{" "}
      <input
        type="number"
        value={props.value}
        onChange={(e) => props.setValue(parseInt(e.target.value))}
      />
      <br />
    </>
  );
};
