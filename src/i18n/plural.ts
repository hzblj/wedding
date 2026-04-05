export const plural = (count: number, one: string, few: string, many: string): string => {
  if (count === 1) {
    return one
  }

  if (count >= 2 && count <= 4) {
    return few
  }

  return many
}
