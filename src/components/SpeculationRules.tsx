'use client';

import { useEffect } from 'react';

/**
 * Speculation Rules Engine
 * Instructs modern browsers (Chrome / Edge) to silently pre-fetch and pre-render
 * internal links in background memory the moment a user hovers their mouse or approaches a touch target.
 * Result: Next page loads at 0ms latency (instant transition).
 */
export default function SpeculationRules() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('HTMLScriptElement' in window)) return;
    
    // Check if speculation rules are supported by checking HTMLScriptElement.supports
    const supportsSpeculationRules = 
      HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules');
      
    if (supportsSpeculationRules || !HTMLScriptElement.supports) {
      const script = document.createElement('script');
      script.type = 'speculationrules';
      script.textContent = JSON.stringify({
        prerender: [
          {
            source: 'document',
            where: {
              href_matches: '/*',
              relative_to: 'document',
            },
            eagerness: 'moderate', // Triggers automatically on hover (~200ms threshold)
          },
        ],
      });
      
      document.head.appendChild(script);
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  return null;
}
