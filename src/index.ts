import { writeFileSync } from "fs"
import { exportToCSV } from "./csv"
import { scaleBoltzmann, scaleSigmaCut } from "./scaling"
import { deterministicSelection, prepareCopyCounts } from "./selection"
import { evalF2, rand2d } from "./utils"

const n = 100

const population = rand2d(n, 2, -2.048, 2.048)
const evalPopulation = population.map(x => evalF2(x[0], x[1]))


const selection = deterministicSelection(prepareCopyCounts(evalPopulation, n))

const csv = {
    "x1": population.map(xs => xs[0]),
    "x2": population.map(xs => xs[1]),
    "przystosowanie": evalPopulation,
    "selekcja bez skalowania": selection.map(e => evalPopulation[e.index])
}

;[1, 2, 3].forEach(c => {
    const sigmaCutPopulation = scaleSigmaCut(evalPopulation, c as any)
    const sigmaCutSelection = deterministicSelection(prepareCopyCounts(sigmaCutPopulation, n))

    csv[`przystosowanie sigma-odcięcie c = ${c}`] = sigmaCutPopulation
    csv[`selekcja sigma-odcięcie c = ${c}`] = sigmaCutSelection.map(e => evalPopulation[e.index])
})

;[100, 500, 1000].forEach(t => {
    const boltzmannPopulation = scaleBoltzmann(evalPopulation, t)
    const boltzmannSelection = deterministicSelection(prepareCopyCounts(boltzmannPopulation, n))

    csv[`przystosowanie boltzmann t = ${t}`] = boltzmannPopulation
    csv[`selekcja boltzmann t = ${t}`] = boltzmannSelection.map(e => evalPopulation[e.index])
})

writeFileSync("data.csv", exportToCSV(csv), "utf8")