'use client';

import { useEffect } from 'react';

/**
 * UI Protector & Anti-Copy Shield
 * Actively deters competitor espionage, layout cloning, and image theft while preserving normal patient browsing.
 */
export default function UIProtector() {
  useEffect(() => {
    // 1. Prevent Right-Click Context Menu (Protects custom medical 3D illustrations from easy saving)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Intercept DevTools & View Source keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
