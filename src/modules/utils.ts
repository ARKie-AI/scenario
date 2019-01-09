export const wait = (time: number) => new Promise((resolve) => setTimeout(() => resolve(), time * 1000))
