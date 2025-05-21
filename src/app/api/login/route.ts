// app/api/login/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { serialize } from "cookie";
import { BASE_URL } from "@/lib";
// import { EncryptionService } from '@/lib/encryption';
// import { env } from '@/lib/env';
// import { encrypt } from '@/lib/encryption';
// import sha256 from 'crypto-js/sha256';
// const encryptionService = new EncryptionService(env.ENCRYPTION_SECRET);
// await encryptionService.initialize();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return Response.json(
        {
          success: false,
          errors: [{ message: "Email and password are required" }],
        },
        { status: 400 },
      );
    }

    const url = `${BASE_URL}/api/v1/auth/login`;
    const loginResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const loginData = await loginResponse.json();
    // console.log(loginData, "loginData");

    // ❌ LOGIN FAILED
    if (loginData.errors) {
      // console.log(loginData.errors, "============: erroras");
      const message = loginData?.errors?.[0]?.description || "Login failed";
      // console.log(message, "message");

      // Return consistent error structure
      return Response.json(
        { success: false, errors: [{ message }] },
        { status: loginResponse.status },
      );
    }

    const { accessToken, userId, refreshToken } = loginData;

    // ✅ FETCH PERMISSIONS
    const permUrl = `${BASE_URL}/api/v1/permission/user/${userId}`;
    const permResponse = await fetch(permUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const permissions = await permResponse.json();

    const userPermissions = JSON.stringify(permissions);
    console.log(userPermissions, "permissions");
    // const hashDigest = sha256(userPermissions);
    // console.log(hashDigest, "userPermissions");
    // const userPermissions = await (permissions)
    // Create response object
    const res = new NextResponse(
      JSON.stringify({
        success: true,
        userId: userId,
      }),
      { status: 200 },
    );
    // const encrypted = await encryptionService.encrypt(userPermissions);

    // console.log(encrypted, "encrypted");

    // Set all cookies consistently using the same approach
    res.headers.append(
      "Set-Cookie",
      serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }),
    );

    res.headers.append(
      "Set-Cookie",
      serialize("userId", userId, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
      }),
    );
    // Store permissions in JWT cookie - can handle large permission sets
    // ENCRYPT THE PERMISSIONS using crypto-js
    // This handles large permission sets elegantly
    // const encryptedPermissions = encrypt(userPermissions);

    // console.log(encryptedPermissions, "encryptedPermissions");
    // res.headers.append('Set-Cookie', serialize('encryptedPermissions', encryptedPermissions, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   path: '/',
    //   maxAge: 60 * 60,
    // }));
    // res.headers.append('Set-Cookie', serialize('userPermissions', hashDigest, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   path: '/',
    //   maxAge: 60 * 60,  // Can have different expiry than session
    // }));

    // Use the same approach for refreshToken as well
    res.headers.append(
      "Set-Cookie",
      serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }),
    );

    return res;
  } catch (error: any) {
    console.error("[LOGIN ERROR]", error);
    return Response.json(
      {
        success: false,
        errors: [{ message: "An unexpected error occurred" }],
      },
      { status: 500 },
    );
  }
}
