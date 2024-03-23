import { Roboto } from "next/font/google";
import "./globals.css";
import "./colors.css";
import "material-icons/iconfont/material-icons.css";
import { SharedProviders } from "@/components/shared";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskManager V2",
  description:
    "With TaskManager, you can easily create to-do lists and prioritize tasks according to their importance. Our user-friendly interface makes it easy to navigate and access all the features you need to stay organized and productive",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <link
          rel="icon"
          href="../../public/task-manager-v2-logo.png"
          sizes="16x16"
        />
        <SharedProviders>{children}</SharedProviders>
      </body>
    </html>
  );
}
