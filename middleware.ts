import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT = 20; // максимум 20 запросов
const WINDOW_MS = 60 * 1000; // 1 минута

// Храним счетчик в памяти
const requestStore = new Map<
  string,
  { count: number; startTime: number }
>();

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ограничиваем только download API
  if (pathname.startsWith("/api/download")) {
    // В dev режиме проще использовать фиксированный ключ
    const key = "download-rate-limit";

    const now = Date.now();
    const record = requestStore.get(key);

    if (!record) {
      requestStore.set(key, { count: 1, startTime: now });
    } else {
      if (now - record.startTime > WINDOW_MS) {
        // прошло больше минуты → сбрасываем
        requestStore.set(key, { count: 1, startTime: now });
      } else {
        record.count++;

        if (record.count > RATE_LIMIT) {
          return new NextResponse(
            JSON.stringify({ error: "Too many requests" }),
            { status: 429 }
          );
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};