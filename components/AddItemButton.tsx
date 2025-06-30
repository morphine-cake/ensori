"use client";

interface AddItemButtonProps {
  onAddItem: () => void;
}

export default function AddItemButton({ onAddItem }: AddItemButtonProps) {
  return (
    <button
      onClick={onAddItem}
      className="sf-add-item-button w-full text-sf-fg-default font-inter font-semibold flex items-center justify-start gap-2 outline-none focus:outline-none active:outline-none"
      style={{ height: "40px", fontSize: "12px" }}
      type="button"
    >
      + Add Item
    </button>
  );
}
