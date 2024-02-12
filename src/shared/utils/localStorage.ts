// Синтаксический сахар для обращения к localStorage
export const ls = {
  set: (key: string, value: string): void => localStorage.setItem(key, value),
  get: (key: string): string | null => localStorage.getItem(key),
  remove: (key: string): void => localStorage.removeItem(key),
  clear: (): void => localStorage.clear()
}

// Функция для получения всех ключей из localStorage по префиксу
export function getKeysByPreffix(prefix: string) {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(prefix)) keys.push(key)
  }
  return keys
}
