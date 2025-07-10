"use client";

interface TopBarProps {
  userInitial?: string;
  onAddItem?: () => void;
  currentDate?: string;
}

// Logo component using currentColor for theme adaptation
const SjofnLogo = () => (
  <svg
    width="55"
    height="18"
    viewBox="0 0 46 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.38938 11.3585C9.29663 11.3585 9.22144 11.2833 9.22144 11.1905V3.15396C9.22144 3.06121 9.29663 2.98601 9.38938 2.98601H10.2912C10.3709 2.98601 10.4396 3.04202 10.4557 3.12008L10.6228 3.93137C10.6377 4.00358 10.7329 4.02385 10.7787 3.9661C11.272 3.34464 12.0656 2.82593 13.1595 2.82593C14.9365 2.82593 15.945 4.05858 15.945 5.83553V11.1905C15.945 11.2833 15.8698 11.3585 15.7771 11.3585H14.6722C14.5794 11.3585 14.5042 11.2833 14.5042 11.1905V6.21973C14.5042 5.05111 14.008 4.17064 12.7593 4.17064C11.7188 4.17064 10.6622 4.97107 10.6622 6.36381V11.1905C10.6622 11.2833 10.587 11.3585 10.4943 11.3585H9.38938Z"
      fill="currentColor"
    />
    <path
      d="M3.92208 11.5346C1.60085 11.5346 0 9.75761 0 7.18024C0 4.68291 1.58484 2.82593 3.85805 2.82593C6.19529 2.82593 7.42794 4.60287 7.42794 6.9241V7.23641C7.42794 7.32917 7.35275 7.40436 7.26 7.40436H1.55249C1.45674 7.40436 1.38005 7.48445 1.38794 7.57987C1.52513 9.23942 2.51431 10.2859 3.92208 10.2859C4.97491 10.2859 5.74513 9.74891 6.04685 8.86083C6.07856 8.76749 6.17921 8.71338 6.27213 8.74632L7.20706 9.07769C7.29392 9.10847 7.34007 9.20374 7.30655 9.28958C6.76138 10.6857 5.52789 11.5346 3.92208 11.5346ZM3.84204 4.05858C2.68264 4.05858 1.79945 4.8 1.49725 6.10273C1.4736 6.20467 1.55296 6.29977 1.65761 6.29977H5.79862C5.89316 6.29977 5.96952 6.22163 5.96211 6.12738C5.87472 5.01455 5.22773 4.05858 3.84204 4.05858Z"
      fill="currentColor"
    />
    <path
      d="M45.8321 2.98633C45.9249 2.98633 46.0001 3.06152 46.0001 3.15428V11.1908C46.0001 11.2836 45.9249 11.3588 45.8321 11.3588H44.7273C44.6345 11.3588 44.5593 11.2836 44.5593 11.1908V3.15428C44.5593 3.06152 44.6345 2.98633 44.7273 2.98633H45.8321Z"
      fill="currentColor"
    />
    <path
      d="M44.5593 1.34811V2.5678C44.5593 2.65293 44.6283 2.72194 44.7135 2.72194H45.845C45.9301 2.72194 45.9991 2.65293 45.9991 2.5678V1.34811C45.9991 1.26298 45.9301 1.19397 45.845 1.19397H44.7135C44.6283 1.19397 44.5593 1.26298 44.5593 1.34811Z"
      fill="currentColor"
    />
    <path
      d="M42.0007 2.92212C42.1556 2.92213 42.3028 2.92968 42.4265 2.9397C42.5118 2.94661 42.5769 3.01916 42.5769 3.10474V4.2063C42.5767 4.31209 42.4796 4.39057 42.3748 4.37622C42.2171 4.35456 42.0642 4.34692 41.8718 4.34692C40.6553 4.34711 39.6794 5.30788 39.6794 6.78052V11.1907C39.6794 11.2833 39.604 11.3584 39.5115 11.3586H38.406C38.3134 11.3585 38.2381 11.2833 38.238 11.1907V10.5872C39.1933 8.52061 39.1936 6.12139 38.238 4.05493V3.15356C38.2383 3.06109 38.3135 2.98668 38.406 2.98657H39.3025C39.3847 2.98666 39.4552 3.0461 39.4685 3.1272L39.6326 4.12915C39.6462 4.21181 39.7647 4.22819 39.8064 4.15552C40.2183 3.43701 40.9812 2.92212 42.0007 2.92212Z"
      fill="currentColor"
    />
    <path
      d="M18.2828 8.8855C18.3686 8.82301 18.4907 8.85546 18.5426 8.948C19.0293 9.81489 19.9917 10.3337 21.0104 10.3337C21.7632 10.3337 22.4464 10.0849 22.7213 9.55347C22.9063 9.9617 23.1292 10.3564 23.3883 10.7341C22.7946 11.2408 21.9501 11.5349 21.0104 11.5349C19.5394 11.5349 18.0684 10.9204 17.3942 9.70679C17.3545 9.63534 17.3769 9.54593 17.443 9.4978L18.2828 8.8855ZM20.9303 2.82593C21.5806 2.82593 22.1799 2.9637 22.691 3.19995C22.5184 3.5913 22.379 3.99352 22.2741 4.40308C21.8847 4.15221 21.4123 4.01058 20.8668 4.0105C19.9064 4.0105 19.2654 4.49062 19.2653 5.24292C19.2653 6.02733 20.0019 6.17136 21.1705 6.42749C21.4558 6.49405 21.7486 6.56137 22.0358 6.63647C22.0541 7.1224 22.1183 7.60649 22.2272 8.08276C21.8571 7.91547 21.3315 7.81403 20.6744 7.67651C19.2977 7.37236 17.8571 7.06807 17.8571 5.35522C17.8571 3.86646 19.1534 2.82596 20.9303 2.82593Z"
      fill="currentColor"
    />
    <path
      d="M35.8193 1.66245C35.6472 1.41528 35.7511 1.24311 36.0534 1.54539C39.0913 4.58334 38.8764 9.33458 35.8384 12.3725C32.8005 15.4104 27.9708 15.4697 24.9329 12.4318C24.7591 12.258 24.7725 12.1215 25.05 12.3147C28.0829 14.4265 31.9439 13.966 34.6487 11.2612C37.3536 8.55632 37.9311 4.69539 35.8193 1.66245Z"
      fill="currentColor"
    />
    <path
      d="M25.5885 2.12267C27.9189 -0.20781 31.6159 -0.316878 33.9464 2.01359C34.1805 2.24771 34.0634 2.36477 33.8293 2.24771C31.5653 1.01332 28.7102 1.41235 26.7942 3.32823C24.8783 5.24417 24.4009 7.94362 25.6352 10.2077C25.8694 10.6759 25.7296 10.7703 25.4011 10.4418C23.0707 8.11135 23.258 4.45315 25.5885 2.12267Z"
      fill="currentColor"
    />
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
              style={{ width: "55px", height: "18px", marginTop: "2px" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <SjofnLogo />
              </div>
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
