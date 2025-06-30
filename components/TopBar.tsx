"use client";

interface TopBarProps {
  userInitial?: string;
  onAddItem?: () => void;
  currentDate?: string;
}

// Logo component using currentColor for theme adaptation
const SjofnLogo = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.45673 4.7039C1.75825 3.97595 2.20021 3.31451 2.75736 2.75736C3.31451 2.20021 3.97595 1.75825 4.7039 1.45673C5.43186 1.1552 6.21207 1 7.00001 1C7.78794 1 8.56815 1.1552 9.29611 1.45673C10.0241 1.75826 10.6855 2.20021 11.2426 2.75737C11.7998 3.31452 12.2418 3.97595 12.5433 4.70391"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path d="M1 7L7 7L13 7" stroke="currentColor" strokeLinecap="round" />
    <path d="M2 9H12" stroke="currentColor" strokeLinecap="round" />
    <path d="M3 11H11" stroke="currentColor" strokeLinecap="round" />
    <path d="M6 13H8" stroke="currentColor" strokeLinecap="round" />
  </svg>
);

export default function TopBar({
  userInitial = "B",
  onAddItem,
  currentDate,
}: TopBarProps) {
  // Format date string to "Jun 29" format
  const formatDate = (dateString?: string) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Use provided date or fall back to current date
    const date = dateString ? new Date(dateString) : new Date();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <div
      className="sf-top-bar sticky top-0 bg-sf-bg-default z-50"
      style={{ padding: "24px 16px 16px 16px" }}
    >
      <div className="sf-top-bar-content w-full max-w-sjofn mx-auto flex items-center justify-between">
        {/* Left: Logo, divider, and date */}
        <div
          className="sf-top-bar-left flex items-center"
          style={{ gap: "12px" }}
        >
          <div className="sf-logo box-border content-stretch flex flex-row gap-1.5 items-center justify-start p-0 relative text-fg-default">
            <div
              className="relative shrink-0"
              style={{ width: "14px", height: "14px" }}
            >
              <div className="absolute inset-[-4.167%] flex items-center justify-center">
                <SjofnLogo />
              </div>
            </div>
            <div className="font-inter font-semibold leading-[0] not-italic relative shrink-0 text-sf-fg-default text-[14px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">Sjöfn</p>
            </div>
          </div>

          {/* Vertical divider */}
          <div
            className="sf-divider bg-sf-fg-default"
            style={{
              width: "1px",
              height: "16px",
              opacity: "0.15",
            }}
          ></div>

          <span className="sf-date-label font-inter font-medium text-sf-fg-default text-sm">
            {formatDate(currentDate)}
          </span>
        </div>

        {/* Right: Add button */}
        <div className="sf-top-bar-right flex items-center">
          <button
            className="sf-add-button flex items-center gap-2 transition-colors duration-150 ease-out text-fg-default px-3 py-1.5"
            style={{
              padding: "2px 4px",
              borderRadius: "4px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onAddItem}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(var(--fg-default-rgb), 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(var(--fg-default-rgb), 0.15)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(var(--fg-default-rgb), 0.1)";
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 1V11" stroke="currentColor" strokeLinecap="round" />
              <path d="M11 6L1 6" stroke="currentColor" strokeLinecap="round" />
            </svg>
            <span className="font-inter font-medium text-sf-fg-default text-sm">
              Add Item
            </span>
            <span className="font-inter font-normal text-sf-fg-default text-xs opacity-60">
              (⌘ + ↩)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
