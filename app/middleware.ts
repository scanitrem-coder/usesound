import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const RATE_LIMIT = 20; // максимум 20 запросов
const WINDOW_MS = 60 * 1000; // за 1 минуту

// В памяти храним IP → количество запросов
const ipMap = new Map<
  string,
  { count: number; startTime: number }
>();

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ограничиваем только нужные API
  if (
    pathname.startsWith("/api/download") ||
    pathname.startsWith("/api/purchase")
  ) {
    const ip = req.ip ?? "anonymous";
    const now = Date.now();

    const record = ipMap.get(ip);

    if (!record) {
      ipMap.set(ip, { count: 1, startTime: now });
    } else {
      if (now - record.startTime > WINDOW_MS) {
        // прошло больше минуты → сбрасываем
        ipMap.set(ip, { count: 1, startTime: now });
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