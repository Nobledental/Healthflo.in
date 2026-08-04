// Utility for mobile device vibration haptics & tactile web interaction

export const haptic = {
  /**
   * Light tap vibration (10ms) — best for tab switches, filter toggles, menu opening
   */
  light: () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch (e) {
        // Ignore unsupported or insecure origin restriction
      }
    }
  },

  /**
   * Medium double tap (15ms, pause, 15ms) — best for primary CTA clicks, opening booking drawers
   */
  medium: () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([18, 35, 18]);
      } catch (e) {
        // Ignore
      }
    }
  },

  /**
   * Success pulsation — best for form submissions and successful actions
   */
  success: () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([20, 40, 30, 40, 50]);
      } catch (e) {
        // Ignore
      }
    }
  }
};
