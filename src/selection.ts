import { sum } from "./utils";

export function prepareCopyCounts(evals: number[], n: number) {
    const evsum = sum(evals)

    const expected = evals.map(ev => n * ev / evsum)
    const integer = expected.map(ex => Math.floor(ex))
    const fraction = expected.map(ex => ex - Math.floor(ex))

    return { expected, integer, fraction }
}