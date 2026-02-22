import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { s3 } from "@/lib/r2"


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get("trackId");

    if (!trackId) {
      return NextResponse.json({ error: "No trackId provided" }, { status: 400 });
    }

    // Получаем access token из заголовка
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    // Создаём временный клиент для проверки пользователя
    const supabaseUser = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    // Проверяем покупку
    const { data: purchase, error: purchaseError } = await supabaseUser
  .from("purchases")
  .select("*")
  .eq("user_id", user.id)
  .eq("track_id", trackId)
  .limit(1)
  .maybeSingle();


    if (purchaseError || !purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 403 });
    }

    if (purchase.downloads_remaining <= 0) {
      return NextResponse.json({ error: "No downloads remaining" }, { status: 403 });
    }

    // Уменьшаем лимит
    const { error: updateError } = await supabaseUser
      .from("purchases")
      .update({
        downloads_remaining: purchase.downloads_remaining - 1,
      })
      .eq("id", purchase.id);

    if (updateError) {
  return NextResponse.json({ error: "Failed to update downloads" }, { status: 500 });
}

// 🔹 Получаем трек
const { data: track, error: trackError } = await supabaseUser
  .from("tracks")
  .select("full_url")
  .eq("id", trackId)
  .limit(1)
  .maybeSingle();

console.log("TRACK FROM DB:", track);
console.log("FULL URL VALUE:", track?.full_url);
console.log("R2 BUCKET:", process.env.R2_BUCKET);
console.log("ACCOUNT ID:", process.env.R2_ACCOUNT_ID);
console.log("ACCESS KEY:", process.env.R2_ACCESS_KEY);



if (trackError || !track) {
  return NextResponse.json({ error: "Track not found" }, { status: 404 });
}

// 🔹 Генерируем signed URL
const decodedKey = "tracks/" + decodeURIComponent(track.full_url);

const command = new GetObjectCommand({
  Bucket: process.env.R2_BUCKET!,
  Key: decodedKey,
  ResponseContentDisposition: "attachment",
});



const signedUrl = await getSignedUrl(s3, command, {
  expiresIn: 300, // 300 секунд жизни ссылки
});

// 🔹 Возвращаем ссылку
return NextResponse.json({
  url: signedUrl,
});

  } catch (err) {
  console.error("DOWNLOAD ERROR:", err);
  return NextResponse.json({ error: "Server error" }, { status: 500 });
}

}
