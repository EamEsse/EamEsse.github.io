(() => {
  const storageKey = "eam-esse-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = "system";

  function readPreference() {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved === "light" || saved === "dark" ? saved : "system";
    } catch {
      return "system";
    }
  }

  function applyTheme() {
    const theme = preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
      meta.content = theme === "dark" ? "#17171b" : "#faf7f4";
    });
    document.querySelectorAll("[data-theme-select]").forEach(select => {
      select.value = preference;
    });
  }

  preference = readPreference();
  applyTheme();
  systemTheme.addEventListener("change", applyTheme);
  window.addEventListener("storage", event => {
    if (event.key === storageKey || event.key === null) {
      preference = readPreference();
      applyTheme();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    document.querySelectorAll("[data-theme-select]").forEach(select => {
      select.addEventListener("change", () => {
        preference = select.value;
        try {
          if (preference === "system") localStorage.removeItem(storageKey);
          else localStorage.setItem(storageKey, preference);
        } catch {
          // The selected theme still works when browser storage is unavailable.
        }
        applyTheme();
      });
    });
  });
})();
