"use client";
import * as React from "react";
import { useApp, useHydrated, type BookingRecord } from "@/store/app-store";
import { dateKey } from "./format";

/** Clearly-labelled sample bookings so a fresh demo account has something to show. */
export function demoBookings(): BookingRecord[] {
  const now = new Date();
  const day = (n: number) => dateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + n));
  const addr = { id: "demo-addr", label: "Home", name: "Demo Customer", phone: "9800000000", district: "kathmandu" as const, area: "Baneshwor", street: "Sample Street 12", landmark: "Near the demo gate", pin: { x: 52, y: 48 } };
  return [
    { id: "FS-DEMO-1001", serviceSlug: "pipe-leakage-repair", mode: "book", qty: 1, addOnIds: [], dateKey: day(1), slotId: "10-12", address: addr, notes: "Sample booking for the demo.", photoCount: 0, coupon: null, payment: "cash", total: 800, status: 1, proId: "p1", createdAt: now.getTime() - 3600_000, demo: true },
    { id: "FS-DEMO-0990", serviceSlug: "home-deep-cleaning", mode: "book", qty: 1, addOnIds: [], dateKey: day(-6), slotId: "08-10", address: addr, notes: "", photoCount: 0, coupon: null, payment: "digital", total: 4500, status: 5, proId: "p2", createdAt: now.getTime() - 9 * 86400_000, demo: true },
    { id: "FS-DEMO-0975", serviceSlug: "electrical-troubleshooting", mode: "quote", qty: 1, addOnIds: [], dateKey: day(-14), slotId: "14-16", address: addr, notes: "", photoCount: 0, coupon: null, payment: "none", total: 400, status: 5, proId: "p3", createdAt: now.getTime() - 16 * 86400_000, demo: true },
  ];
}

/** Store bookings first (newest first), then demo samples that have not been modified. */
export function useAllBookings() {
  const store = useApp((s) => s.bookings);
  const hydrated = useHydrated();
  const addBooking = useApp((s) => s.addBooking);
  const updateBooking = useApp((s) => s.updateBooking);
  const demo = React.useMemo(() => demoBookings(), []);
  const all = React.useMemo(() => [...(hydrated ? store : []), ...demo.filter((d) => !(hydrated ? store : []).some((b) => b.id === d.id))], [store, demo, hydrated]);
  /** Update any booking; demo samples are copied into the store the first time they change. */
  const update = React.useCallback((id: string, patch: Partial<BookingRecord>) => {
    if (useApp.getState().bookings.some((b) => b.id === id)) updateBooking(id, patch);
    else { const d = demo.find((x) => x.id === id); if (d) addBooking({ ...d, ...patch }); }
  }, [demo, addBooking, updateBooking]);
  return { all, update, ready: hydrated };
}
