import { NextResponse } from "next/server";

export async function POST() {
  try {
    const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    if (!SUPABASE_PROJECT_URL || !SERVICE_ROLE_KEY) {
      throw new Error("Chaves de ambiente não configuradas corretamente.");
    }

    const res = await fetch(`${SUPABASE_PROJECT_URL}/auth/v1/admin/providers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        name: "firebase",
        issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
        client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
        secret: "",
        redirect_uri: `${SUPABASE_PROJECT_URL}/auth/v1/callback`,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      error: "Erro ao adicionar provedor",
      details: error,
    });
  }
}
