
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <span className="not-found-code">404</span>
      <span className="not-found-icon" aria-hidden="true">🍳</span>

      <h1 id="not-found-title">Ops! Receita não encontrada</h1>

      <p>
        Parece que essa página não está no nosso livro de receitas.
        Que tal voltar ao catálogo e descobrir algo delicioso?
      </p>

      <Link className="not-found-button" to="/">
        ← Voltar ao catálogo
      </Link>
    </section>
  )
}
