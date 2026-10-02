"use client";
import { create } from "zustand";

type Ui = { searchOpen: boolean; menuOpen: boolean; areaOpen: boolean; coupon: string | null; setCoupon: (c: string | null) => void; setSearch: (v: boolean) => void; setMenu: (v: boolean) => void; setAreaOpen: (v: boolean) => void };
export const useUi = create<Ui>((set) => ({
  searchOpen: false, menuOpen: false, areaOpen: false, coupon: null,
  setCoupon: (coupon) => set({ coupon }),
  setSearch: (searchOpen) => set({ searchOpen }),
  setMenu: (menuOpen) => set({ menuOpen }),
  setAreaOpen: (areaOpen) => set({ areaOpen }),
}));
