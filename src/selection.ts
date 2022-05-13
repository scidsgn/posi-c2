import { sum } from "./utils"

type SelectionData = {
    evals: number[],
    expected: number[],
    integer: number[],
    fraction: number[]
}

export function prepareCopyCounts(evals: number[], n: number): SelectionData {
    const evsum = sum(evals)

    const expected = evals.map(ev => n * ev / evsum)
    const integer = expected.map(ex => Math.floor(ex))
    const fraction = expected.map(ex => ex - Math.floor(ex))

    return { evals, expected, integer, fraction }
}

export function deterministicSelection(data: SelectionData) {
    const newPopulation = []

    for (let i = 0; i < data.evals.length; i++) {
        for (let j = 0; j < data.integer[i]; j++) {
            newPopulation.push({
                index: i,
                eval: data.evals[i]
            })
        }
    }

    let emptySeats = data.evals.length - newPopulation.length
    const sortedFractions = data.fraction.map(
        (fraction, i) => ({
            i, fraction
        })
    ).sort(
        (f1, f2) => f2.fraction - f1.fraction
    )

    while (emptySeats > 0) {
        const item = sortedFractions.shift()
        newPopulation.push({
            index: item.i,
            eval: data.evals[item.i]
        })

        emptySeats -= 1
    }

    return newPopulation
}