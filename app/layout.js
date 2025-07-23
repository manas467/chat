// app/layout.js
import './globals.css'
import { Providers } from './Providers'

export const metadata = {
  title: 'ChatAI',
  description: 'Chat App with AI features',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
