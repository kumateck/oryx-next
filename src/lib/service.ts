export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean }> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ⬅️ REQUIRED to store cookies from response
    body: JSON.stringify({ email, password }),
  });

  console.log(res, "response");

  // if (!res.ok) {
  //   const errorData = await res.json();
  //   throw new Error(errorData?.errors?.[0]?.message || 'Login failed');
  // }

  return await res.json();
}
