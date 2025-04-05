import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  debug: process.env.NODE_ENV === "development",
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
