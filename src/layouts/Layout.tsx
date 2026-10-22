import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <Link to="/" className="logo">🍳 Receitário</Link>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Receitário · FIAP · Dados da DummyJSON</p>
      </footer>
    </div>
  )
}
