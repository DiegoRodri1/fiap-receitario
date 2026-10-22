import { useEffect, useMemo, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { getRecipes } from '../services/api'
import type { Recipe } from '../types/recipe'

export default function Catalogo() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // Culinárias montadas a partir dos dados da API
  const cuisines = useMemo(
    () => Array.from(new Set(recipes.map((r) => r.cuisine))).sort(),
    [recipes],
  )

  // Busca e filtro funcionam juntos
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return recipes.filter(
      (r) =>
        r.name.toLowerCase().includes(term) &&
        (cuisine === '' || r.cuisine === cuisine),
    )
  }, [recipes, search, cuisine])

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  if (loading) return <p className="status">Carregando receitas...</p>
  if (error) return <p className="status error">{error}</p>

  return (
    <section>
      <div className="page-top">
        <h1>Nossas receitas</h1>
        <span className="fav-counter">{favorites.length} favoritas</span>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Buscar receita pelo nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Todas as culinárias</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="status">Nenhuma receita encontrada. Tente outra busca.</p>
      ) : (
        <div className="grid">
          {filtered.map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              isFavorite={favorites.includes(r.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
