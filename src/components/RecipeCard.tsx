import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'

interface Props {
  recipe: Recipe
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }: Props) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

  return (
    <article className="card">
      <Link to={`/receitas/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <h3>
          <Link to={`/receitas/${recipe.id}`}>{recipe.name}</Link>
        </h3>
        <p>{recipe.cuisine}</p>
        <p>⏱ {totalTime} min</p>
        <button
          type="button"
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥ Favoritada' : '♡ Favoritar'}
        </button>
      </div>
    </article>
  )
}
