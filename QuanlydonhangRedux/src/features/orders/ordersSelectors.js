import { createSelector } from "@reduxjs/toolkit";

const selectSlice = (s) => s.orders;

export const selectAll = createSelector([selectSlice], (s) =>
  s.ids.map((id) => s.entities[id])
);

export const selectFilters = createSelector([selectSlice], (s) => s.filters);

export const selectFilteredSorted = createSelector(
  [selectAll, selectFilters],
  (orders, f) => {
    let result = orders;

    if (f.status !== "ALL") {
      result = result.filter((o) => o.status === f.status);
    }

    if ((f.search || "").trim()) {
      const q = f.search.trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.customerName.toLowerCase().includes(q) ||
          o.items.some(
            (it) =>
              (it.name || "").toLowerCase().includes(q) ||
              (it.sku || "").toLowerCase().includes(q)
          )
      );
    }

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (f.sortBy === "createdAt") {
        cmp = a.createdAt.localeCompare(b.createdAt);
      } else {
        cmp = a.total - b.total;
      }
      return f.sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }
);

export const selectById = (id) =>
  createSelector([(s) => s.orders.entities[id]], (o) => o);

export const selectLoading = createSelector([selectSlice], (s) => s.loading);
export const selectError = createSelector([selectSlice], (s) => s.error);
