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
  const [difficulty, setDifficulty] = useState('')
  const [favorites, setFavorites] = useState<number[]>(() => {
  try {
    const saved = localStorage.getItem('receitario-favorites')
    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)

    return Array.isArray(parsed)
      ? parsed.filter((id): id is number => typeof id === 'number')
      : []
  } catch {
    return []
  }
})

useEffect(() => {
  localStorage.setItem('receitario-favorites', JSON.stringify(favorites))
}, [favorites])

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

  return recipes.filter((recipe) => {
    const matchesName = recipe.name.toLowerCase().includes(term)

    const matchesCuisine =
      cuisine === '' || recipe.cuisine === cuisine

    const matchesDifficulty =
      difficulty === '' || recipe.difficulty === difficulty

    return matchesName && matchesCuisine && matchesDifficulty
  })
}, [recipes, search, cuisine, difficulty])

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
        <select
  value={difficulty}
  onChange={(e) => setDifficulty(e.target.value)}
>
  <option value="">Todas as dificuldades</option>
  <option value="Easy">Fácil</option>
  <option value="Medium">Médio</option>
  <option value="Hard">Difícil</option>
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
