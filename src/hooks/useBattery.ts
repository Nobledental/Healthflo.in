"use client";

import { useState, useEffect } from "react";

interface BatteryState {
  supported: boolean;
  loading: boolean;
  level: number;
  charging: boolean;
}

export function useBattery(): BatteryState {
  const [state, setState] = useState<BatteryState>({
    supported: true,
    loading: true,
    level: 1,
    charging: true,
  });

  useEffect(() => {
    let mounted = true;
    let battery: any = null;

    const updateBattery = () => {
      if (mounted && battery) {
        setState({
          supported: true,
          loading: false,
          level: battery.level,
          charging: battery.charging,
        });
      }
    };

    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        battery = b;
        updateBattery();

        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      });
    } else {
      setState((s) => ({ ...s, supported: false, loading: false }));
    }

    return () => {
      mounted = false;
      if (battery) {
        battery.removeEventListener("levelchange", updateBattery);
        battery.removeEventListener("chargingchange", updateBattery);
      }
    };
  }, []);

  return state;
}
