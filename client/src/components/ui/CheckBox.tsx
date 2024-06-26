import { ComponentProps } from "react";

type CheckBoxProps = ComponentProps<"input"> & {
  label?: string;
};

const CheckBox = ({ label, ...checkBoxProps }: CheckBoxProps) => {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <input
        {...checkBoxProps}
        className="form-checkbox rounded-sm border focus:ring-0"
        type="checkbox"
      />
      {label && <label className="font-light">{label}</label>}
    </div>
  );
};

export default CheckBox;
