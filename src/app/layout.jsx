import { Roboto} from 'next/font/google'
import './globals.css'
import "material-icons/iconfont/material-icons.css";

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
    title: 'TaskManager V2',
    description: 'With TaskManager, you can easily create to-do lists and prioritize tasks according to their importance. Our user-friendly interface makes it easy to navigate and access all the features you need to stay organized and productive',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
