"use client";

import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div
      className="landing-page-container min-h-screen bg-bg-default text-fg-default font-dm-mono"
      style={{
        background: `linear-gradient(180deg, rgb(var(--bg-default-rgb)) 71.67%, rgba(var(--bg-default-rgb), 0.00) 100%)`,
        position: "relative",
      }}
    >
      {/* Fixed Navigation */}
      <nav
        className="landing-nav fixed top-0 left-0 right-0 z-50 px-[24px] md:px-[40px]"
        style={{
          background: `linear-gradient(180deg, rgb(var(--bg-default-rgb)) 71.67%, rgba(var(--bg-default-rgb), 0.00) 100%)`,
        }}
      >
        <div className="nav-content max-w-[720px] mx-auto py-[16px] flex justify-between items-center">
          {/* Logo */}
          <div className="nav-logo flex items-center gap-2 select-none">
            <svg
              width="18"
              height="18"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-icon text-fg-default select-none"
            >
              <path
                d="M28.2812 0.00671387C42.5975 0.673119 53.9999 12.4906 54 26.9716C54 41.8805 41.9138 53.9666 27.0049 53.9667C12.0959 53.9667 0.00976562 41.8805 0.00976562 26.9716C0.00986887 12.5116 11.3791 0.70742 25.666 0.00964355C11.9114 0.720031 9.04005 12.519 9.04004 26.9706C9.04004 41.8795 12.096 53.9656 27.0049 53.9657C41.9138 53.9657 43.8477 41.8795 43.8477 26.9706C43.8477 12.4981 42.0255 0.685921 28.2812 0.00671387Z"
                fill="currentColor"
              />
            </svg>
            <span className="logo-text text-fg-default font-medium select-none">
              ensori
            </span>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="nav-login-btn px-4 py-2 border border-nav-border rounded-full text-fg-default hover:border-accent hover:text-accent active:bg-bg-active transition-all duration-200 text-sm"
          >
            login
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="landing-main pt-20">
        <div className="main-content mx-auto">
          <div className="hero-section flex pb-[60px] sm:pt-[60px] sm:px-[40px] sm:pb-[120px] flex-col items-center justify-center self-stretch mx-auto rounded-3xl">
            {/* Hero Wrapper with Gradient */}
            <div
              className="hero-wrapper flex flex-col items-center justify-between max-w-[1024px] w-full pt-20 px-10 pb-0 rounded-3xl overflow-hidden bg-[url('/hero-bg-image-light.png'),linear-gradient(180deg,var(--hero-gradient-start)_0%,var(--hero-gradient-end)_100%)] dark:bg-[url('/hero-bg-image-dark.png'),linear-gradient(180deg,var(--hero-gradient-start)_0%,var(--hero-gradient-end)_100%)] h-auto sm:h-[715px]"
              style={{
                backgroundSize: "cover, cover",
                backgroundPosition: "center bottom, center",
                backgroundRepeat: "no-repeat, no-repeat",
              }}
            >
              <div className="hero-content flex max-w-[480px] flex-col items-center">
                <h1 className="hero-title text-fg-default text-center font-dm-mono text-[42px] font-medium leading-[1.2] mb-[20px]">
                  focus only on today
                </h1>
                <p className="hero-description text-fg-default text-center font-dm-mono text-[20px] font-normal leading-[1.4] mb-[16px]">
                  ensori is a minimalist to-do app designed to keep you present.
                </p>
                <p className="hero-tagline text-fg-soft text-center font-dm-mono text-[14px] font-normal leading-[1.4] mb-[32px]">
                  no backlog . no tomorrow . just today
                </p>
                <button
                  onClick={handleLogin}
                  className="hero-cta-btn group flex h-[36px] px-[24px] justify-center items-center rounded-[24px] bg-[#b12c2f] hover:bg-[#191919] active:bg-[#191919] transition-all duration-200"
                  style={{
                    boxShadow: "none",
                    transition: "all 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 0 2px #b12c2f inset";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="text-white text-center font-dm-mono text-[14px] font-medium leading-normal">
                    Create your free account
                  </span>
                </button>
              </div>

              {/* Hero Image */}
              <div
                className="hero-image-container flex justify-center mt-8 bg-bg-default rounded-t-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 6px var(--hero-border-color), 0 36px 80px 0 var(--hero-shadow-color), 0 15.04px 33.422px 0 var(--hero-shadow-color), 0 8.041px 17.869px 0 var(--hero-shadow-color), 0 4.508px 10.017px 0 var(--hero-shadow-color), 0 2.394px 5.32px 0 var(--hero-shadow-color), 0 0.996px 2.214px 0 var(--hero-shadow-color)",
                }}
              >
                <img
                  src="/hero-image-light.png"
                  alt="Ensori hero illustration"
                  className="hero-image max-w-full h-auto block dark:hidden"
                  style={{ maxWidth: "600px", width: "100%" }}
                />
                <img
                  src="/hero-image-dark.png"
                  alt="Ensori hero illustration"
                  className="hero-image max-w-full h-auto hidden dark:block"
                  style={{ maxWidth: "600px", width: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section w-full flex flex-col items-center py-[60px] px-[40px] sm:py-[120px] gap-[160px] sm:gap-[260px]">
            {/* Feature 01 */}
            <div className="feature-box w-full flex flex-col items-start text-left max-w-[720px]">
              <div
                className="feature-icon bg-[url('/landingpage-icons/01-icon-today-light.svg')] dark:bg-[url('/landingpage-icons/01-icon-today-dark.svg')] bg-no-repeat bg-contain"
                style={{ height: "32px", width: "68px" }}
                role="img"
                aria-label="Today focus icon"
              />
              <h2
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                no past. no future. just now.
              </h2>
              <p
                className="feature-description text-fg-default font-dm-mono"
                style={{
                  fontSize: "16px",
                  fontWeight: "300",
                  lineHeight: "160%",
                }}
              >
                only unfinished tasks carry over to tomorrow. completed items
                disappear, leaving no digital mess behind.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="feature-box w-full flex flex-col items-start text-left max-w-[720px]">
              <div
                className="feature-icon bg-[url('/landingpage-icons/02-icon-clarity-light.svg')] dark:bg-[url('/landingpage-icons/02-icon-clarity-dark.svg')] bg-no-repeat"
                style={{
                  height: "46px",
                  width: "80px",
                  backgroundSize: "auto 46px",
                  backgroundPosition: "left center",
                }}
                role="img"
                aria-label="Clarity icon"
              />
              <h2
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                clarity over complexity
              </h2>
              <p
                className="feature-description text-fg-default font-dm-mono"
                style={{
                  fontSize: "16px",
                  fontWeight: "300",
                  lineHeight: "160%",
                }}
              >
                most task apps are filled with boards, tags, priorities, and
                overdue tasks. ensori removes the clutter, you just write what
                matters today.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="feature-box w-full flex flex-col items-start text-left max-w-[720px]">
              <div
                className="feature-icon bg-[url('/landingpage-icons/03-icon-status-light.svg')] dark:bg-[url('/landingpage-icons/03-icon-status-dark.svg')] bg-no-repeat bg-contain"
                style={{ height: "32px", width: "68px" }}
                role="img"
                aria-label="Task states icon"
              />
              <h2
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                three simple task states
              </h2>
              <p
                className="feature-description text-fg-default font-dm-mono"
                style={{
                  fontSize: "16px",
                  fontWeight: "300",
                  lineHeight: "160%",
                }}
              >
                every task in ensori can be marked as to do, done, or an
                abstract middle state. that middle state is intentionally
                flexible. it could mean "in progress," "partially done," or "do
                it next." you define what it means to you.
              </p>
            </div>

            {/* Feature 04 */}
            <div className="feature-box w-full flex flex-col items-start text-left max-w-[720px]">
              <div
                className="feature-icon bg-[url('/landingpage-icons/04-icon-design-light.svg')] dark:bg-[url('/landingpage-icons/04-icon-design-dark.svg')] bg-no-repeat bg-contain"
                style={{ height: "32px", width: "68px" }}
                role="img"
                aria-label="Design intention icon"
              />
              <h2
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                designed with intention
              </h2>
              <p
                className="feature-description text-fg-default font-dm-mono"
                style={{
                  fontSize: "16px",
                  fontWeight: "300",
                  lineHeight: "160%",
                }}
              >
                ensori's visual style is inspired by japanese zen aesthetics,
                from the enso-like status icon to the clean, handwritten caveat
                font. it's a to-do app that feels personal and calm.
              </p>
            </div>

            {/* Feature 05 */}
            <div className="feature-box w-full flex flex-col items-start text-left max-w-[720px]">
              <div
                className="feature-icon bg-[url('/landingpage-icons/05-icon-mode-light.svg')] dark:bg-[url('/landingpage-icons/05-icon-mode-dark.svg')] bg-no-repeat bg-contain"
                style={{ height: "32px", width: "68px" }}
                role="img"
                aria-label="Dark mode icon"
              />
              <h2
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                light & dark Mode
              </h2>
              <p
                className="feature-description text-fg-default font-dm-mono"
                style={{
                  fontSize: "16px",
                  fontWeight: "300",
                  lineHeight: "160%",
                }}
              >
                Ensori adapts to your flow — whether you're planning in the
                early morning or organizing your evening. Minimal and beautiful
                in both light and dark modes.
              </p>

              {/* Mode Images */}
              <div
                className="mode-images flex w-full max-[548px]:flex-col"
                style={{
                  gap: "32px",
                  marginTop: "24px",
                }}
              >
                <div
                  className="image-box overflow-hidden rounded-3xl"
                  style={{
                    flex: "1 1 auto",
                  }}
                >
                  <img
                    src="/light-mode-1.jpg"
                    alt="Light mode interface"
                    className="mode-image"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
                <div
                  className="image-box overflow-hidden rounded-3xl"
                  style={{
                    flex: "1 1 auto",
                  }}
                >
                  <img
                    src="/dark-mode-02.jpg"
                    alt="Dark mode interface"
                    className="mode-image"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Build Section */}
          <div
            className="build-section w-full flex justify-center"
            style={{
              padding: "120px 40px",
            }}
          >
            <div
              className="build-container w-full flex flex-col items-start max-w-[720px]"
              style={{
                gap: "60px",
              }}
            >
              {/* Divider */}
              <div
                className="divider w-full"
                style={{
                  height: "1px",
                  backgroundColor: "var(--divider-color)",
                }}
              />

              {/* Content Section */}
              <div className="build-content flex flex-col items-start">
                {/* Cursor Logo */}
                <img
                  src="/Cursor-Logo.svg"
                  alt="Cursor AI Logo"
                  className="cursor-logo dark:invert"
                  style={{
                    width: "62px",
                    height: "62px",
                  }}
                />

                {/* Title */}
                <h2
                  className="build-title text-fg-default font-dm-mono font-medium"
                  style={{
                    fontSize: "20px",
                    lineHeight: "140%",
                    marginTop: "32px",
                    marginBottom: "12px",
                  }}
                >
                  built with cursor ai
                </h2>

                {/* Description */}
                <p
                  className="build-description text-fg-default font-dm-mono"
                  style={{
                    fontSize: "16px",
                    fontWeight: "300",
                    lineHeight: "160%",
                    marginBottom: "16px",
                  }}
                >
                  ensori was designed with care in figma and developed using{" "}
                  <a
                    href="https://cursor.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg-default underline hover:text-accent transition-colors duration-200"
                  >
                    cursor
                  </a>
                  , an ai-first coding environment.
                </p>

                {/* Small Description */}
                <p
                  className="build-small-description text-fg-default font-dm-mono"
                  style={{
                    fontSize: "16px",
                    fontWeight: "300",
                    lineHeight: "140%",
                  }}
                >
                  fast to ship. fun to build.
                </p>

                {/* Profile Box */}
                <div
                  className="profile-box flex flex-col sm:flex-row items-start sm:items-center"
                  style={{
                    marginTop: "60px",
                    gap: "16px",
                  }}
                >
                  {/* Profile Image */}
                  <img
                    src="/Profile-Image.png"
                    alt="Burak Basci Profile"
                    className="profile-image"
                    style={{
                      width: "66px",
                      height: "66px",
                      borderRadius: "40%",
                      objectFit: "cover",
                    }}
                  />

                  {/* Profile Content */}
                  <div className="profile-content flex flex-col">
                    {/* Profile Text */}
                    <div className="profile-text">
                      <p
                        className="profile-name text-fg-default font-dm-mono"
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "140%",
                          margin: "0",
                        }}
                      >
                        built by burak başcı
                      </p>
                      <p
                        className="profile-description text-fg-default font-dm-mono"
                        style={{
                          fontSize: "14px",
                          fontWeight: "300",
                          lineHeight: "140%",
                          margin: "0",
                        }}
                      >
                        just a designer trying to make things simpler.
                      </p>
                    </div>

                    {/* Social Links */}
                    <div
                      className="social-links flex"
                      style={{ gap: "12px", marginTop: "4px" }}
                    >
                      {/* Twitter/X */}
                      <a
                        href="https://x.com/burak_basci"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link transition-opacity duration-200 text-fg-default"
                        style={{ opacity: "0.6" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.1629 3.49976H16.3691L11.5504 9.00601L17.2191 16.4998H12.7816L9.30352 11.956L5.32852 16.4998H3.11914L8.27227 10.6091L2.83789 3.49976H7.38789L10.5285 7.65288L14.1629 3.49976ZM13.3879 15.181H14.6098L6.72227 4.74976H5.40977L13.3879 15.181Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/brkbsc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link transition-opacity duration-200 text-fg-default"
                        style={{ opacity: "0.6" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0094 6.40635C8.025 6.4001 6.4125 8.00635 6.40625 9.99072C6.4 11.9751 8.00625 13.5876 9.99063 13.5938C11.975 13.6001 13.5875 11.9938 13.5938 10.0095C13.6 8.0251 11.9937 6.4126 10.0094 6.40635ZM9.99063 7.66885C11.2781 7.6626 12.325 8.70322 12.3313 9.99072C12.3375 11.2782 11.2969 12.3251 10.0094 12.3313C8.72187 12.3376 7.675 11.297 7.66875 10.0095C7.6625 8.72197 8.70313 7.6751 9.99063 7.66885ZM12.9094 6.25947C12.9094 5.79697 13.2844 5.42197 13.7469 5.42197C14.2094 5.42197 14.5844 5.79697 14.5844 6.25947C14.5844 6.72197 14.2094 7.09697 13.7469 7.09697C13.2844 7.09697 12.9094 6.72197 12.9094 6.25947ZM16.9625 7.10947C16.9094 5.9876 16.6531 4.99385 15.8313 4.1751C15.0125 3.35635 14.0188 3.1001 12.8969 3.04385C11.7406 2.97822 8.275 2.97822 7.11875 3.04385C6 3.09697 5.00625 3.35322 4.18437 4.17197C3.3625 4.99072 3.10937 5.98447 3.05312 7.10635C2.9875 8.2626 2.9875 11.7282 3.05312 12.8845C3.10625 14.0063 3.3625 15.0001 4.18437 15.8188C5.00625 16.6376 5.99688 16.8938 7.11875 16.9501C8.275 17.0157 11.7406 17.0157 12.8969 16.9501C14.0188 16.897 15.0125 16.6407 15.8313 15.8188C16.65 15.0001 16.9062 14.0063 16.9625 12.8845C17.0281 11.7282 17.0281 8.26572 16.9625 7.10947ZM15.4688 14.1251C15.225 14.7376 14.7531 15.2095 14.1375 15.4563C13.2156 15.822 11.0281 15.7376 10.0094 15.7376C8.99062 15.7376 6.8 15.8188 5.88125 15.4563C5.26875 15.2126 4.79688 14.7407 4.55 14.1251C4.18438 13.2032 4.26875 11.0157 4.26875 9.99697C4.26875 8.97822 4.1875 6.7876 4.55 5.86885C4.79375 5.25635 5.26562 4.78447 5.88125 4.5376C6.80312 4.17197 8.99062 4.25635 10.0094 4.25635C11.0281 4.25635 13.2187 4.1751 14.1375 4.5376C14.75 4.78135 15.2219 5.25322 15.4688 5.86885C15.8344 6.79072 15.75 8.97822 15.75 9.99697C15.75 11.0157 15.8344 13.2063 15.4688 14.1251Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/burakbasci/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link transition-opacity duration-200 text-fg-default"
                        style={{ opacity: "0.6" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 3H3.99688C3.44688 3 3 3.45313 3 4.00938V15.9906C3 16.5469 3.44688 17 3.99688 17H16C16.55 17 17 16.5469 17 15.9906V4.00938C17 3.45313 16.55 3 16 3ZM7.23125 15H5.15625V8.31875H7.23438V15H7.23125ZM6.19375 5C6.85937 5 7.39687 5.5375 7.39687 6.20312C7.39687 6.86875 6.85937 7.40625 6.19375 7.40625C5.52812 7.40625 4.99062 6.86875 4.99062 6.20312C4.99062 5.5375 5.52812 5 6.19375 5ZM15.0094 15H12.9344V11.75C12.9344 10.975 12.9187 9.97812 11.8562 9.97812C10.775 9.97812 10.6094 10.8219 10.6094 11.6938V15H8.53438V8.31875H10.525V9.23125H10.5531C10.8313 8.70625 11.5094 8.15312 12.5188 8.15312C14.6188 8.15312 15.0094 9.5375 15.0094 11.3375V15Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Second Divider */}
                <div
                  className="divider w-full"
                  style={{
                    height: "1px",
                    backgroundColor: "var(--divider-color)",
                    marginTop: "60px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="footer-section flex flex-col justify-end items-center"
        style={{
          padding: "120px 40px",
        }}
      >
        {/* Footer Illustration */}
        <img
          src="/footer-image.svg"
          alt="Footer illustration"
          className="footer-image"
          style={{
            width: "50px",
            height: "auto",
          }}
        />

        {/* Footer Description */}
        <p
          className="footer-description text-fg-default font-dm-mono text-center"
          style={{
            fontSize: "14px",
            fontWeight: "300",
            lineHeight: "140%",
            marginTop: "20px",
            margin: "20px 0 0 0",
          }}
        >
          a minimalist task app built to help you stay present
        </p>
      </footer>

      {/* Page Image Box */}
      <div
        className="page-image-box"
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "-1",
          height: "800px",
        }}
      >
        {/* Page Image Inner */}
        <div
          className="page-image-inner"
          style={{
            width: "100%",
            maxWidth: "1024px",
            margin: "0 auto",
            height: "800px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="/page-bg-light.png"
            alt="Page background"
            className="block dark:hidden"
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "auto",
              maxWidth: "1024px",
            }}
          />
          <img
            src="/page-bg-dark.png"
            alt="Page background"
            className="hidden dark:block"
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: "auto",
              maxWidth: "1024px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
