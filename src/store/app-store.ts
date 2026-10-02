"use client";
import * as React from "react";
import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

export type AreaChoice = "kathmandu" | "lalitpur" | "bhaktapur" | null;

export type Address = { id: string; label: string; name: string; phone: string; district: "kathmandu" | "lalitpur" | "bhaktapur"; area: string; street: string; landmark: string; pin: { x: number; y: number } | null };

export type BookingRecord = {
  id: string;
  serviceSlug: string;
  mode: "book" | "quote";
  qty: number;
  addOnIds: string[];
  dateKey: string;
  slotId: string;
  address: Address;
  notes: string;
  photoCount: number;
  coupon: string | null;
  payment: "cash" | "digital" | "card" | "none";
  total: number;
  status: number; // 0..5 timeline index (simulated)
  proId: string;
  createdAt: number;
  demo?: boolean;
};

export type Enquiry = {
  id: string; listingId: string; listingTitle: string; kind: "rooms" | "land" | "property" | "owner";
  name: string; phone: string; when: string; message: string; at: number;
};
export type MyReview = { bookingId: string; rating: number; text: string; at: number };
export type Ticket = { id: string; subject: string; message: string; at: number; bookingId?: string };
export type NotificationItem = { id: string; title: string; body: string; time: string; read: boolean };

type Toast = { id: number; msg: string; tone: "success" | "info" | "error" };

type State = {
  area: AreaChoice;
  setArea: (a: AreaChoice) => void;
  user: { phone: string; name: string; email?: string } | null;
  updateUser: (patch: { name?: string; email?: string }) => void;
  tickets: Ticket[];
  addTicket: (t: Ticket) => void;
  resetDemo: () => void;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  bookings: BookingRecord[];
  addBooking: (b: BookingRecord) => void;
  updateBooking: (id: string, patch: Partial<BookingRecord>) => void;
  saved: string[];
  toggleSaved: (slug: string) => void;
  savedListings: string[];
  toggleSavedListing: (id: string) => void;
  enquiries: Enquiry[];
  addEnquiry: (e: Enquiry) => void;
  addresses: Address[];
  saveAddress: (a: Address) => void;
  removeAddress: (id: string) => void;
  notifications: NotificationItem[];
  markAllRead: () => void;
  notify: (title: string, body: string) => void;
  proAuthed: boolean;
  proLogin: () => void;
  proLogout: () => void;
  myReviews: MyReview[];
  addReview: (r: MyReview) => void;
  proOnline: boolean;
  setProOnline: (v: boolean) => void;
  proJobs: Record<string, "accepted" | "rejected" | "done">;
  setProJob: (id: string, v: "accepted" | "rejected" | "done") => void;
  announcementHidden: boolean;
  hideAnnouncement: () => void;
  toasts: Toast[];
  toast: (msg: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
};

const safeStorage: StateStorage = {
  getItem: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  setItem: (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } },
  removeItem: (k) => { try { localStorage.removeItem(k); } catch { /* storage blocked */ } },
};

const SEED_NOTIFS: NotificationItem[] = [
  { id: "n1", title: "Welcome to the Famous Services prototype", body: "Everything here uses demo data. No real bookings are made.", time: "Just now", read: false },
  { id: "n2", title: "Demo offer available", body: "Use code DEMO10 on your first demo booking.", time: "Today", read: false },
  { id: "n3", title: "Reminder (demo)", body: "Your demo booking FS-DEMO-1001 is scheduled for tomorrow.", time: "Yesterday", read: true },
];

let toastId = 1;

export const useApp = create<State>()(
  persist(
    (set, get) => ({
      area: null,
      setArea: (area) => set({ area }),
      user: null,
      login: (phone, name) => set({ user: { phone, name: name || "Demo Customer" } }),
      logout: () => set({ user: null }),
      updateUser: (patch) => { const u = get().user; if (u) set({ user: { ...u, ...patch } }); },
      tickets: [],
      addTicket: (t) => set({ tickets: [t, ...get().tickets] }),
      resetDemo: () => set({ user: null, bookings: [], saved: [], savedListings: [], enquiries: [], addresses: [], notifications: SEED_NOTIFS, myReviews: [], tickets: [], proJobs: {}, proAuthed: false, proOnline: true, area: null }),
      bookings: [],
      addBooking: (b) => set({ bookings: [b, ...get().bookings] }),
      updateBooking: (id, patch) => set({ bookings: get().bookings.map((b) => (b.id === id ? { ...b, ...patch } : b)) }),
      saved: [],
      toggleSaved: (slug) => set({ saved: get().saved.includes(slug) ? get().saved.filter((s) => s !== slug) : [...get().saved, slug] }),
      savedListings: [],
      toggleSavedListing: (id) => set({ savedListings: get().savedListings.includes(id) ? get().savedListings.filter((s) => s !== id) : [...get().savedListings, id] }),
      enquiries: [],
      addEnquiry: (e) => set({ enquiries: [e, ...get().enquiries] }),
      addresses: [],
      saveAddress: (a) => set({ addresses: [a, ...get().addresses.filter((x) => x.id !== a.id)] }),
      removeAddress: (id) => set({ addresses: get().addresses.filter((a) => a.id !== id) }),
      notifications: SEED_NOTIFS,
      notify: (title, body) => set({ notifications: [{ id: `n${Date.now()}`, title, body, time: "Just now", read: false }, ...get().notifications] }),
      markAllRead: () => set({ notifications: get().notifications.map((n) => ({ ...n, read: true })) }),
      proAuthed: false,
      proLogin: () => set({ proAuthed: true }),
      proLogout: () => set({ proAuthed: false }),
      myReviews: [],
      addReview: (r) => set({ myReviews: [r, ...get().myReviews.filter((x) => x.bookingId !== r.bookingId)] }),
      proOnline: true,
      setProOnline: (proOnline) => set({ proOnline }),
      proJobs: {},
      setProJob: (id, v) => set({ proJobs: { ...get().proJobs, [id]: v } }),
      announcementHidden: false,
      hideAnnouncement: () => set({ announcementHidden: true }),
      toasts: [],
      toast: (msg, tone = "success") => {
        const id = toastId++;
        set({ toasts: [...get().toasts, { id, msg, tone }] });
        setTimeout(() => get().dismissToast(id), 3800);
      },
      dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: "fs-frontend-demo-v1",
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({ area: s.area, user: s.user, bookings: s.bookings, saved: s.saved, savedListings: s.savedListings, enquiries: s.enquiries, addresses: s.addresses, notifications: s.notifications, proOnline: s.proOnline, proAuthed: s.proAuthed, myReviews: s.myReviews, tickets: s.tickets, proJobs: s.proJobs, announcementHidden: s.announcementHidden }),
      skipHydration: true,
    },
  ),
);

const useHydFlag = create<{ h: boolean }>(() => ({ h: false }));

/** True once persisted state has been loaded in the browser (so server and first client render always match). */
export const useHydrated = () => useHydFlag((s) => s.h);

/** Mount once in the root layout. */
export function StoreHydrator() {
  React.useEffect(() => {
    Promise.resolve(useApp.persist.rehydrate()).finally(() => useHydFlag.setState({ h: true }));
  }, []);
  return null;
}
