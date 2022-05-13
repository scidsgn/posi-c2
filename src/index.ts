import { writeFileSync } from "fs"
import { exportToCSV } from "./csv"
import { scaleBoltzmann, scaleSigmaCut } from "./scaling"
import { deterministicSelection, prepareCopyCounts } from "./selection"
import { evalF2, rand2d } from "./utils"

const n = 100

const population = rand2d(n, 2, -2.048, 2.048)
const evalPopulation = population.map(x => evalF2(x[0], x[1]))

const sigmaCutPopulation = scaleSigmaCut(evalPopulation, 1)
const boltzmannPopulation = scaleBoltzmann(evalPopulation, 500)


const selection = deterministicSelection(prepareCopyCounts(evalPopulation, n))
const sigmaCutSelection = deterministicSelection(prepareCopyCounts(sigmaCutPopulation, n))
const boltzmannSelection = deterministicSelection(prepareCopyCounts(boltzmannPopulation, n))

writeFileSync(
    "data.csv", exportToCSV({
        "x1": population.map(xs => xs[0]),
        "x2": population.map(xs => xs[1]),
        "przystosowanie": evalPopulation,
        "przystosowanie sigma-odcięcie": sigmaCutPopulation,
        "przystosowanie boltzmann": boltzmannPopulation,
        "selekcja bez skalowania": selection.map(e => evalPopulation[e.index]),
        "selekcja sigma-odcięcie": sigmaCutSelection.map(e => evalPopulation[e.index]),
        "selekcja boltzmann": boltzmannSelection.map(e => evalPopulation[e.index]),
    }), "utf8"
)