import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar        from '@/components/Navbar'
import Footer        from '@/components/Footer'
import CustomCursor  from '@/components/CustomCursor'
import HomePage      from '@/pages/HomePage'
import AboutPage     from '@/pages/AboutPage'
import JoinPage      from '@/pages/JoinPage'
import SponsorsPage  from '@/pages/SponsorsPage'
import MemoriesPage  from '@/pages/MemoriesPage'
import ContactPage   from '@/pages/ContactPage'

const Placeholder = ({ title }) => (
  <main className="min-h-screen flex items-center justify-center"
    style={{ paddingTop: 'var(--nav-h)' }}>
    <p className="t-serif text-4xl italic" style={{ color: 'var(--stone)' }}>
      {title} — coming soon
    </p>
  </main>
)

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/join"     element={<JoinPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
