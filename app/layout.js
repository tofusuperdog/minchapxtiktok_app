import { IBM_Plex_Sans_Thai } from "next/font/google";
import Script from "next/script";
import "@byteplus/veplayer/index.min.css";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

export const metadata = {
  title: "MinChap - TikTok style short series",
  description: "Experience the best short series in a TikTok-style feed on MinChap.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ibmPlexSansThai.className}>
      <body className="antialiased">
        <Script
          id="veplayer-dev-error-filter"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function isKnownVePlayerWarning(value) {
                  var message = "";
                  if (typeof value === "string") {
                    message = value;
                  } else if (value && typeof value === "object") {
                    message = value.message || value.stack || "";
                  } else {
                    message = String(value || "");
                  }

                  return (
                    message.indexOf("getPrivateDrmInfo is not a function") !== -1 ||
                    message.indexOf("Cannot read properties of undefined (reading 'abr')") !== -1 ||
                    message.indexOf('Cannot read properties of undefined (reading "abr")') !== -1
                  );
                }

                window.__MINCHAP_IS_KNOWN_VEPLAYER_WARNING__ = isKnownVePlayerWarning;

                function isKnownVePlayerWarningArgs(args) {
                  var values = Array.prototype.slice.call(args || []);
                  var combined = values
                    .map(function (value) {
                      if (typeof value === "string") return value;
                      if (value && typeof value === "object") {
                        return value.message || value.stack || "";
                      }
                      return String(value || "");
                    })
                    .join(" ");

                  return values.some(isKnownVePlayerWarning) || isKnownVePlayerWarning(combined);
                }

                var originalConsoleError = console.error;
                console.error = function () {
                  if (isKnownVePlayerWarningArgs(arguments)) return;
                  return originalConsoleError.apply(console, arguments);
                };

                var originalOnError = window.onerror;
                window.onerror = function (message, source, lineno, colno, error) {
                  if (isKnownVePlayerWarning(message) || isKnownVePlayerWarning(error)) {
                    return true;
                  }

                  if (typeof originalOnError === "function") {
                    return originalOnError.apply(window, arguments);
                  }

                  return false;
                };

                var originalReportError = window.reportError;
                if (typeof originalReportError === "function") {
                  window.reportError = function (error) {
                    if (isKnownVePlayerWarning(error)) return;
                    return originalReportError.call(window, error);
                  };
                }

                window.addEventListener(
                  "error",
                  function (event) {
                    if (isKnownVePlayerWarning(event.message) || isKnownVePlayerWarning(event.error)) {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                    }
                  },
                  true
                );

                window.addEventListener(
                  "unhandledrejection",
                  function (event) {
                    if (isKnownVePlayerWarning(event.reason)) {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                    }
                  },
                  true
                );
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
