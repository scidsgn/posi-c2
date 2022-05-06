import { avg, stdev } from "./utils"

export function scaleSigmaCut(xs: number[], c: 1 | 2 | 3) {
    const average = avg(xs)
    const sigma = stdev(xs)

    return xs.map(x => Math.max(0, x - (average - c * sigma)))
}

export function scaleBoltzmann(xs: number[], t: number) {
    return xs.map(x => Math.exp(x / t))
}