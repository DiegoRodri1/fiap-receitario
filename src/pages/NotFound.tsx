import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="status">
      <h1>404</h1>
      <p>Ops! Essa página não existe.</p>
      <Link to="/">← Voltar ao catálogo</Link>
    </div>
  )
}
