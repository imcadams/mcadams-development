import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
          'unsupported-callback': () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  onTokenChange: (token: string | null) => void;
}

const scriptSource = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadScript() {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${scriptSource}"]`);

  if (existing) {
    return new Promise<void>((resolve, reject) => {
      if (window.turnstile) {
        resolve();
        return;
      }

      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Verification service could not load.')), { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptSource;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Verification service could not load.'));
    document.head.appendChild(script);
  });
}

export function TurnstileWidget({ siteKey, onTokenChange }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const tokenHandlerRef = useRef(onTokenChange);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    tokenHandlerRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    let disposed = false;

    const render = () => {
      if (disposed || !containerRef.current || !window.turnstile) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: 'contact',
        callback: (token) => {
          setError(undefined);
          tokenHandlerRef.current(token);
        },
        'expired-callback': () => {
          tokenHandlerRef.current(null);
          setError('Verification expired. Please complete it again.');
        },
        'error-callback': () => {
          tokenHandlerRef.current(null);
          setError('Verification could not be completed. Please try again.');
        },
        'unsupported-callback': () => {
          tokenHandlerRef.current(null);
          setError('Verification is not supported by this browser. Please call or email us instead.');
        },
      });
    };

    loadScript()
      .then(render)
      .catch((loadError: unknown) => {
        if (!disposed) {
          tokenHandlerRef.current(null);
          setError(loadError instanceof Error ? loadError.message : 'Verification could not load.');
        }
      });

    return () => {
      disposed = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [siteKey]);

  return (
    <div>
      <div ref={containerRef} />
      {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
