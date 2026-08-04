'use client';

import React from 'react';

/**
 * Speculation Rules Engine
 * Instructs modern browsers (Chrome / Edge) to silently pre-fetch and pre-render
 * internal links in background memory the moment a user hovers their mouse or approaches a touch target.
 * Result: Next page loads at 0ms latency (instant transition).
 */
export default function SpeculationRules() {
  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
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
        }),
      }}
    />
  );
}
