/**
 * Privacy-friendly civic tech analytics abstraction.
 * Dispatches anonymous usage telemetry only if configured, without leaking PII.
 */

export interface AnalyticsEvent {
  action: string;
  category: 'navigation' | 'scheme_search' | 'eligibility_check' | 'pathway_generate' | 'phone_simulator' | 'assisted_mode';
  label?: string;
  value?: number;
}

export const analytics = {
  trackEvent(event: AnalyticsEvent) {
    if (typeof window === 'undefined') return;
    
    // Log in development for auditability
    if (import.meta.env.DEV) {
      console.debug('[Valam Civic Analytics]', event);
    }

    // Extensible hook for self-hosted civic telemetry (e.g. Matomo / Umami / GA4 proxy)
    const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    if (analyticsEndpoint) {
      try {
        navigator.sendBeacon(
          analyticsEndpoint,
          JSON.stringify({
            ...event,
            timestamp: new Date().toISOString(),
            url: window.location.pathname
          })
        );
      } catch {
        // Fail silently
      }
    }
  },

  trackPageView(path: string) {
    this.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: path
    });
  }
};
