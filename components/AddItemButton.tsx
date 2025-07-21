"use client";

interface AddItemButtonProps {
  onAddItem: () => void;
}

export default function AddItemButton({ onAddItem }: AddItemButtonProps) {
  return (
    <button
      onClick={onAddItem}
      className="sf-add-item-button w-4 h-4 flex items-center justify-center outline-none focus:outline-none active:outline-none rounded transition-colors ease-in-out duration-[168ms]"
      style={{
        backgroundColor: "#B12C2F",
        borderRadius: "4px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#8A1F25";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#B12C2F";
      }}
      type="button"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3V13M13 8H3"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
