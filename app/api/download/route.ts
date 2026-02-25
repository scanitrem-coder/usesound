import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/r2";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get("trackId");

    if (!trackId) {
      return NextResponse.json({ error: "No trackId provided" }, { status: 400 });
    }

    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    const supabaseUser = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    // 1) Получаем трек
    const { data: track, error: trackError } = await supabaseUser
      .from("tracks")
      .select("full_url")
      .eq("id", trackId)
      .maybeSingle();

    if (trackError || !track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    // 2) Проверяем, скачивал ли пользователь этот трек раньше
    const { data: existingLog, error: logCheckError } = await supabaseUser
      .from("download_logs")
      .select("id")
      .eq("user_id", user.id)
      .eq("track_id", trackId)
      .maybeSingle();

    if (logCheckError) {
      return NextResponse.json({ error: "Failed to check download history" }, { status: 500 });
    }

    const alreadyDownloaded = !!existingLog;

    // 3) Если НЕ скачивал — тогда проверяем баланс и списываем
    if (!alreadyDownloaded) {
      const { data: profile, error: profileError } = await supabaseUser
        .from("profiles")
        .select("downloads_balance")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
      }

      if (profile.downloads_balance <= 0) {
        return NextResponse.json({ error: "No credits left" }, { status: 403 });
      }

      // списываем 1 кредит
      const { error: decrementError } = await supabaseAdmin.rpc("decrement_download_balance", {
        user_id_param: user.id,
        count_param: 1,
      });

      if (decrementError) {
        return NextResponse.json({ error: "Failed to decrement balance" }, { status: 500 });
      }

      // записываем, что пользователь скачал этот трек
      const { error: insertLogError } = await supabaseAdmin
      .from("download_logs")
      .insert({ user_id: user.id, track_id: trackId });

      if (insertLogError) {
        return NextResponse.json({ error: "Failed to save download history" }, { status: 500 });
      }
    }

    // 4) Готовим правильный Key для R2
    let key = track.full_url;

    // Если в БД случайно лежит полный URL — превращаем в key
    if (key.startsWith("http://") || key.startsWith("https://")) {
      const u = new URL(key);
      key = u.pathname.startsWith("/") ? u.pathname.slice(1) : u.pathname;
    }

    // Если нет папки — не добавляем "tracks/" насильно, потому что у тебя есть "full/..."
    key = "tracks/" + decodeURIComponent(key);
    console.log("R2 KEY USED:", key);
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      ResponseContentDisposition: "attachment",
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return NextResponse.json({
  url: signedUrl,
  alreadyDownloaded,
});
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}