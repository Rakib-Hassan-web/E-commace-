export async function registerUser(userData) {
  const res = await fetch("/api/auth/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, body: data };
}

export async function loginUser(credentials) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, body: data };
}

export async function verifyOtp({ email, otp }) {
  const res = await fetch("/api/auth/verifyotp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, body: data };
}

export async function resendOtp({ email }) {
  const res = await fetch("/api/auth/resendotp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, body: data };
}
