import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

// Tách gói theo tuyến đường: các trang ít dùng chỉ được tải khi người dùng
// thực sự truy cập, giúp gói JavaScript ban đầu nhẹ hơn.
const Articles = lazy(() => import('./pages/Articles'))
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'))
const Categories = lazy(() => import('./pages/Categories'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

/** Khung xương hiển thị trong lúc chờ tải một trang. */
function PageLoader() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 pt-12">
      <div className="mb-4 h-9 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="mb-10 h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ScrollToTop />

      <main className="flex-1 pb-10">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bai-viet" element={<Articles />} />
            <Route path="/bai-viet/:slug" element={<ArticleDetail />} />
            <Route path="/danh-muc" element={<Categories />} />
            <Route path="/da-luu" element={<Bookmarks />} />
            <Route path="/gioi-thieu" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
