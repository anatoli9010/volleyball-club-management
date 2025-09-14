import * as Papa from 'papaparse'
import type { ParseResult } from 'papaparse'

export type Exercise = {
  name: string
  description: string
  category: string
  goals: string
  time: string
  level: string
  equipment: string
  video: string
}

function mapKeys(record: Record<string, string>): Exercise {
  // Bulgarian column names expected: Име, Описание, Категория, Цели, Време, Ниво, Инвентар, Видео
  return {
    name: record['Име'] || record['Name'] || '',
    description: record['Описание'] || record['Description'] || '',
    category: record['Категория'] || record['Category'] || '',
    goals: record['Цели'] || record['Goals'] || '',
    time: record['Време'] || record['Time'] || '',
    level: record['Ниво'] || record['Level'] || '',
    equipment: record['Инвентар'] || record['Equipment'] || '',
    video: record['Видео'] || record['Video'] || '',
  }
}

export async function loadExercises(path = '/exercises.csv'): Promise<Exercise[]> {
  const res = await fetch(path)
  const text = await res.text()
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<Record<string, string>>) => {
        const mapped = (results.data || []).map((e: Record<string, string>) => mapKeys(e)).filter((e: Exercise) => e.name)
        resolve(mapped)
      },
      error: (err: any) => reject(err),
    })
  })
}

