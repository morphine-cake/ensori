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
          <div className="hero-section flex pt-[60px] px-[40px] pb-[120px] flex-col items-center justify-center self-stretch mx-auto rounded-3xl">
            {/* Hero Wrapper with Gradient */}
            <div
              className="hero-wrapper flex flex-col items-center justify-between max-w-[1024px] w-full pt-20 px-10 pb-0 rounded-3xl overflow-hidden"
              style={{
                backgroundImage: `url('/hero-bg-image.png'), linear-gradient(180deg, var(--hero-gradient-start) 0%, var(--hero-gradient-end) 100%)`,
                backgroundSize: "cover, cover",
                backgroundPosition: "center bottom, center",
                backgroundRepeat: "no-repeat, no-repeat",
                height: "715px",
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
                  className="hero-cta-btn group flex h-[36px] px-[24px] justify-center items-center rounded-[24px] bg-accent hover:bg-fg-default active:bg-fg-default transition-all duration-200"
                  style={{
                    boxShadow: "none",
                    transition: "all 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 2px var(--accent) inset";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="text-bg-default text-center font-dm-mono text-[14px] font-medium leading-normal">
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
                  src="/hero-image.png"
                  alt="Ensori hero illustration"
                  className="hero-image max-w-full h-auto"
                  style={{ maxWidth: "600px", width: "100%" }}
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div
            className="features-section w-full flex flex-col items-center"
            style={{
              padding: "120px 40px",
              gap: "260px",
            }}
          >
            {/* Feature 01 */}
            <div className="feature-box w-full flex flex-col items-start text-left max-w-[720px]">
              <img
                src="/landingpage-icons/01-icon-today.svg"
                alt="Today focus icon"
                className="feature-icon dark-mode-invert"
                style={{ height: "32px", width: "auto" }}
              />
              <h3
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                no past. no future. just now.
              </h3>
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
              <img
                src="/landingpage-icons/02-icon-clarity.svg"
                alt="Clarity icon"
                className="feature-icon dark-mode-invert"
                style={{ height: "32px", width: "auto" }}
              />
              <h3
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                clarity over complexity
              </h3>
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
              <img
                src="/landingpage-icons/03-icon-status.svg"
                alt="Task states icon"
                className="feature-icon dark-mode-invert"
                style={{ height: "32px", width: "auto" }}
              />
              <h3
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                three simple task states
              </h3>
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
              <img
                src="/landingpage-icons/04-icon-design.svg"
                alt="Design intention icon"
                className="feature-icon dark-mode-invert"
                style={{ height: "32px", width: "auto" }}
              />
              <h3
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                designed with intention
              </h3>
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
              <img
                src="/landingpage-icons/05-icon-dark_mode.svg"
                alt="Dark mode icon"
                className="feature-icon dark-mode-invert"
                style={{ height: "32px", width: "auto" }}
              />
              <h3
                className="feature-title text-fg-default font-dm-mono font-medium"
                style={{
                  fontSize: "20px",
                  lineHeight: "140%",
                  marginTop: "40px",
                  marginBottom: "12px",
                }}
              >
                light & dark Mode
              </h3>
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
              padding: "120px 0",
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
                  className="cursor-logo dark-mode-invert"
                  style={{
                    width: "62px",
                    height: "62px",
                  }}
                />

                {/* Title */}
                <h2
                  className="build-title text-fg-default font-dm-mono font-medium"
                  style={{
                    fontSize: "32px",
                    lineHeight: "140%",
                    marginTop: "32px",
                    marginBottom: "32px",
                  }}
                >
                  built with cursor ai
                </h2>

                {/* Description */}
                <p
                  className="build-description text-fg-default font-dm-mono"
                  style={{
                    fontSize: "20px",
                    fontWeight: "300",
                    lineHeight: "140%",
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
                  className="profile-box flex items-start"
                  style={{
                    marginTop: "60px",
                    gap: "8px",
                    alignItems: "center",
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
                      borderRadius: "50%",
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
                          fontSize: "16px",
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
                          fontSize: "16px",
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
                        className="social-link transition-opacity duration-200"
                        style={{ opacity: "0.6" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                      >
                        <img
                          src="/Twitter Icon.svg"
                          alt="Twitter"
                          className="dark-mode-invert"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://www.instagram.com/brkbsc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link transition-opacity duration-200"
                        style={{ opacity: "0.6" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                      >
                        <img
                          src="/Instagram Icon.svg"
                          alt="Instagram"
                          className="dark-mode-invert"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </a>

                      {/* LinkedIn */}
                      <a
                        href="https://www.linkedin.com/in/burakbasci/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link transition-opacity duration-200"
                        style={{ opacity: "0.6" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.opacity = "1")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = "0.6")
                        }
                      >
                        <img
                          src="/Linkedin Icon.svg"
                          alt="LinkedIn"
                          className="dark-mode-invert"
                          style={{ width: "20px", height: "20px" }}
                        />
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
          className="footer-image dark-mode-invert"
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
          }}
        >
          <img
            src="/page-bg.png"
            alt="Page background"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
