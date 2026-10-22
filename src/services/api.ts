import type { Recipe, RecipesResponse } from '../types/recipe'

const BASE_URL = 'https://dummyjson.com/recipes'

export class NotFoundError extends Error {
  constructor() {
    super('Receita não encontrada')
    this.name = 'NotFoundError'
  }
}

export async function getRecipes(): Promise<Recipe[]> {
  // limit=0 traz as 50 receitas (sem isso a API devolve só 30)
  const res = await fetch(`${BASE_URL}?limit=0`)
  if (!res.ok) throw new Error('Erro ao carregar as receitas')
  const data: RecipesResponse = await res.json()
  return data.recipes
}

export async function getRecipeById(id: string): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (res.status === 404) throw new NotFoundError()
  if (!res.ok) throw new Error('Erro ao carregar a receita')
  return res.json()
}
