import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NotFoundError, getRecipeById } from '../services/api'
import type { Recipe } from '../types/recipe'

export default function Detalhe() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    setNotFound(false)
    getRecipeById(id)
      .then(setRecipe)
      .catch((e: Error) => {
        if (e instanceof NotFoundError) setNotFound(true)
        else setError(e.message)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="status">Carregando receita...</p>

  if (notFound)
    return (
      <div className="status">
        <h1>Receita não encontrada</h1>
        <p>Não existe uma receita com o id {id}.</p>
        <Link to="/">← Voltar ao catálogo</Link>
      </div>
    )

  if (error || !recipe)
    return (
      <div className="status error">
        <p>{error ?? 'Algo deu errado.'}</p>
        <Link to="/">← Voltar ao catálogo</Link>
      </div>
    )

  return (
    <article className="detail">
      <Link to="/">← Voltar ao catálogo</Link>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />

      <ul className="times">
        <li>Preparo: {recipe.prepTimeMinutes} min</li>
        <li>Cozimento: {recipe.cookTimeMinutes} min</li>
        <li>Total: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</li>
      </ul>

      <h2>Ingredientes</h2>
      <ul>
        {recipe.ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2>Modo de preparo</h2>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </article>
  )
}
