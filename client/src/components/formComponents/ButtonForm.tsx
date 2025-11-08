interface button {
  types: "submit" | "reset" | "button";
  value: string;
  disabled?: boolean;
  width: string;
}
const ButtonForm: React.FC<button> = ({ types, value, disabled , width }) => {
  return (
    <div className={` ${width} `}>
      <button
        className={`rounded-sm inline px-4 py-2 w-full 
            ${disabled ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "cursor-pointer text-white bg-[#FF6B35]"}
        `}
        type={types}
        disabled={disabled}
      >
        {value}
      </button>
    </div>
  );
};

export default ButtonForm;
