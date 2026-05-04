// fetchWithRefresh: automatically calls refresh token endpoint on 401
export default async function fetchWithRefresh(url, options = {}, retry = true) {
  // ensure cookies are sent so server can read refresh token
  const opts = { ...options, credentials: options?.credentials || "include" };

  const res = await fetch(url, opts);

  // If not unauthorized, return original response
  if (res.status !== 401) return res;

  // Try to refresh access token using refresh token cookie
  try {
    const refreshRes = await fetch("/api/auth/refreshaccesstoken", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      // refresh failed — redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/Login";
      }
      return res;
    }

    // Refresh succeeded — retry original request once
    if (retry) {
      return fetchWithRefresh(url, options, false);
    }

    return res;
  } catch (err) {
    if (typeof window !== "undefined") {
      window.location.href = "/Login";
    }
    throw err;
  }
}
