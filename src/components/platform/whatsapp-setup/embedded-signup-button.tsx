"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/icons";

interface EmbeddedSignupButtonProps {
  onSuccess: (code: string, wabaId: string, phoneNumberId: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

// Extend window type for FB SDK and temp signup data
declare global {
  interface Window {
    FB: {
      init: (opts: object) => void;
      login: (
        cb: (response: {
          authResponse?: { code?: string; accessToken?: string } | null;
          status: string;
        }) => void,
        opts: object,
      ) => void;
    };
    fbAsyncInit?: () => void;
    __metaWabaId?: string;
    __metaPhoneNumberId?: string;
  }
}

export const EmbeddedSignupButton = ({
  onSuccess,
  onError,
  disabled,
}: EmbeddedSignupButtonProps) => {
  const [sdkReady, setSdkReady] = useState(false);
  const [launching, setLaunching] = useState(false);
  const listenerAdded = useRef(false);

  const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID!;
  const META_CONFIG_ID = process.env.NEXT_PUBLIC_META_CONFIG_ID!;

  useEffect(() => {
    if (listenerAdded.current) return;
    listenerAdded.current = true;

    // ── Session-logging message event listener (per Meta docs) ──────────────
    const handleMessage = (event: MessageEvent) => {
      // Meta docs: use endsWith to cover all facebook.com subdomains
      if (!event.origin.endsWith("facebook.com")) return;

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.type === "WA_EMBEDDED_SIGNUP") {
          console.log("[EmbeddedSignup] WA_EMBEDDED_SIGNUP message:", data);

          if (data.event === "FINISH") {
            // Standard flow: waba_id + phone_number_id both present
            const { waba_id, phone_number_id } = data.data ?? {};
            console.log(
              "[EmbeddedSignup] FINISH — waba_id:",
              waba_id,
              " phone_number_id:",
              phone_number_id,
            );
            window.__metaWabaId = waba_id;
            window.__metaPhoneNumberId = phone_number_id;
          } else if (data.event === "FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING") {
            // Coexistence flow (existing WA Business App users):
            // Meta only returns waba_id here — phone_number_id is absent.
            // Backend will auto-discover phone_number_id via Graph API.
            const { waba_id } = data.data ?? {};
            console.log(
              "[EmbeddedSignup] FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING — waba_id:",
              waba_id,
            );
            window.__metaWabaId = waba_id;
            // Use sentinel "__COEXISTENCE__" so resolveBusinessData proceeds
            // immediately without waiting for a phone_number_id that never comes.
            window.__metaPhoneNumberId = "__COEXISTENCE__";
          } else if (data.event === "CANCEL") {
            // CANCEL also covers error cases (per Meta docs error payload also uses event: 'CANCEL')
            const errorMessage = data.data?.error_message;
            console.warn("[EmbeddedSignup] CANCEL/ERROR:", data.data);
            if (errorMessage) {
              onError?.(errorMessage);
            } else {
              onError?.("WhatsApp signup was cancelled.");
            }
            setLaunching(false);
          }
        }
      } catch {
        // Non-JSON messages from facebook.com — log and ignore
        console.log("[EmbeddedSignup] non-JSON message event:", event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onError]);

  const handleClick = () => {
    if (!window.FB) {
      onError?.("Facebook SDK not loaded yet. Please try again.");
      return;
    }

    // Reset previous data
    window.__metaWabaId = undefined;
    window.__metaPhoneNumberId = undefined;
    setLaunching(true);

    // ── Launch method and callback registration (per Meta docs) ─────────────
    window.FB.login(
      (response) => {
        console.log("[EmbeddedSignup] FB.login response:", response);

        if (response.authResponse) {
          // Code is ONLY available here — not in message event data
          const code = response.authResponse.code;
          console.log("[EmbeddedSignup] authResponse code:", code);

          if (!code) {
            setLaunching(false);
            onError?.(
              "Meta did not return an authorization code. Please try again.",
            );
            return;
          }

          // waba_id and phone_number_id come from the FINISH message event.
          // For the Coexistence flow (FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING),
          // only waba_id is returned — phone_number_id is represented by the
          // "__COEXISTENCE__" sentinel and will be auto-discovered by the backend.
          const resolveBusinessData = (retries = 8) => {
            const wabaId = window.__metaWabaId;
            const phoneNumberId = window.__metaPhoneNumberId;
            console.log(
              `[EmbeddedSignup] resolveBusinessData attempt ${9 - retries}/8 — wabaId: ${wabaId}, phoneNumberId: ${phoneNumberId}`,
            );

            if (!wabaId || !phoneNumberId) {
              if (retries > 0) {
                setTimeout(() => resolveBusinessData(retries - 1), 300);
                return;
              }
              // Neither FINISH nor FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING fired.
              // Backend will auto-discover both waba_id & phone_number_id.
              console.warn(
                "[EmbeddedSignup] No FINISH event fired — proceeding with code only.",
              );
              setLaunching(false);
              window.__metaWabaId = undefined;
              window.__metaPhoneNumberId = undefined;
              onSuccess(code, "", "");
              return;
            }

            // Normalize the Coexistence sentinel to empty string.
            // Backend auto-discovers phone_number_id when it receives "".
            const resolvedPhoneNumberId =
              phoneNumberId === "__COEXISTENCE__" ? "" : phoneNumberId;

            if (phoneNumberId === "__COEXISTENCE__") {
              console.log(
                "[EmbeddedSignup] Coexistence flow — passing waba_id only; backend will discover phone_number_id.",
              );
            }

            setLaunching(false);
            window.__metaWabaId = undefined;
            window.__metaPhoneNumberId = undefined;
            onSuccess(code, wabaId, resolvedPhoneNumberId);
          };

          resolveBusinessData();
        } else {
          // User closed popup or denied permission
          console.warn("[EmbeddedSignup] No authResponse:", response);
          setLaunching(false);
          // Only call onError if a CANCEL message wasn't already fired
          // (to avoid double error reporting)
          setTimeout(() => {
            if (launching) {
              onError?.("WhatsApp signup was cancelled or failed.");
            }
          }, 100);
        }
      },
      {
        config_id: META_CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "whatsapp_business_app_onboarding",
          sessionInfoVersion: "3",
        },
      },
    );
  };

  return (
    <>
      {/*
        Per Meta docs: SDK should load with fbAsyncInit set as a global.
        We set fbAsyncInit before the script tag so the SDK calls it on load.
        Using afterInteractive so the global is set before the script executes.
      */}
      <Script
        id="fb-sdk-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function() {
              FB.init({
                appId: '${META_APP_ID}',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v25.0'
              });
              window.__fbSdkReady = true;
              window.dispatchEvent(new Event('fb-sdk-ready'));
            };
          `,
        }}
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        onLoad={() => {
          // fbAsyncInit handles the actual init; this just marks load attempt complete
          console.log("[EmbeddedSignup] SDK script loaded");
          // In case fbAsyncInit already ran before React state update
          if (window.__fbSdkReady) setSdkReady(true);
        }}
      />
      <Script
        id="fb-sdk-ready-listener"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('fb-sdk-ready', function() {
              window.__fbSdkReadyCallback && window.__fbSdkReadyCallback();
            });
          `,
        }}
      />

      {/* Wait for fbAsyncInit → fb-sdk-ready event */}
      <SdkReadyWatcher onReady={() => setSdkReady(true)} />

      <Button
        onClick={handleClick}
        disabled={disabled || !sdkReady || launching}
        className="w-full h-12 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
      >
        {launching ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Opening Meta…
          </>
        ) : !sdkReady ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading SDK…
          </>
        ) : (
          <>
            <WhatsAppIcon className="w-4 h-4" />
            Connect WhatsApp Business
          </>
        )}
      </Button>
    </>
  );
};

/** Small helper component: listens for the custom fb-sdk-ready event */
function SdkReadyWatcher({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    // Already ready
    if (window.__fbSdkReady) {
      onReady();
      return;
    }
    const handler = () => onReady();
    window.addEventListener("fb-sdk-ready", handler);
    return () => window.removeEventListener("fb-sdk-ready", handler);
  }, [onReady]);
  return null;
}

declare global {
  interface Window {
    __fbSdkReady?: boolean;
    __fbSdkReadyCallback?: () => void;
  }
}
