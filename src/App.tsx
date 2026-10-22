import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Catalogo from './pages/Catalogo'
import Detalhe from './pages/Detalhe'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Catalogo />} />
        <Route path="/receitas/:id" element={<Detalhe />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
