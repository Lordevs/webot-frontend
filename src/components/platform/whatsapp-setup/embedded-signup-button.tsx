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

// Extend window type for FB SDK
declare global {
  interface Window {
    FB: {
      init: (opts: object) => void;
      login: (
        cb: (response: { authResponse?: { code: string } }) => void,
        opts: object,
      ) => void;
    };
    fbAsyncInit?: () => void;
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

  // Listen for the embedded-signup message from Meta's popup
  useEffect(() => {
    if (listenerAdded.current) return;
    listenerAdded.current = true;

    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://www.facebook.com" &&
        event.origin !== "https://web.facebook.com"
      )
        return;

      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data.type === "WA_EMBEDDED_SIGNUP") {
          if (data.event === "FINISH") {
            const { waba_id, phone_number_id } = data.data;
            // code comes from FB.login callback; store it temporarily
            // Meta sends phone_number_id and waba_id here
            window.__metaSignupData = { waba_id, phone_number_id };
          }
        }
      } catch {
        // Non-JSON messages from facebook.com — ignore safely
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleClick = () => {
    if (!window.FB) {
      onError?.("Facebook SDK not loaded yet. Please try again.");
      return;
    }
    setLaunching(true);

    window.FB.login(
      (response) => {
        setLaunching(false);
        if (!response.authResponse?.code) {
          onError?.("WhatsApp signup was cancelled or failed.");
          return;
        }
        const code = response.authResponse.code;
        const meta = window.__metaSignupData;
        if (!meta?.waba_id || !meta?.phone_number_id) {
          onError?.(
            "Could not retrieve WhatsApp Business details. Please try again.",
          );
          return;
        }
        onSuccess(code, meta.waba_id, meta.phone_number_id);
        delete window.__metaSignupData;
      },
      {
        config_id: META_CONFIG_ID,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "",
          sessionInfoVersion: "2",
        },
      },
    );
  };

  return (
    <>
      {/* Load FB SDK */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.FB.init({
            appId: META_APP_ID,
            autoLogAppEvents: true,
            xfbml: true,
            version: "v25.0",
          });
          setSdkReady(true);
        }}
      />

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

// Augment window for temp Meta signup data
declare global {
  interface Window {
    __metaSignupData?: { waba_id: string; phone_number_id: string };
  }
}
