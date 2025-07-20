"use client";

interface AddItemButtonProps {
  onAddItem: () => void;
}

export default function AddItemButton({ onAddItem }: AddItemButtonProps) {
  return (
    <button
      onClick={onAddItem}
      className="sf-add-item-button w-full text-sf-fg-default font-dm-mono font-normal flex items-center justify-start gap-2 outline-none focus:outline-none active:outline-none h-[40px] text-xs"
      type="button"
    >
      + Add Item
    </button>
  );
}
