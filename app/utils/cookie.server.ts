import { createCookie, createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const sessionCookie = createCookie("__projects-filter", {
  secrets: ["temp"],
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
});

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: sessionCookie,
  });
