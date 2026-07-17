import Navbar from './Navbar'
import Footer from './Footer'

export default function RootLayout({ children }) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
