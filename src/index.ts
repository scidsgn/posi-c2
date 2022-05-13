import { scaleBoltzmann, scaleSigmaCut } from "./scaling"
import { deterministicSelection, prepareCopyCounts } from "./selection"
import { evalF2, rand2d } from "./utils"

const n = 100

const population = rand2d(n, 2, -2.048, 2.048)
const evalPopulation = population.map(x => evalF2(x[0], x[1]))

const sigmaCutPopulation = scaleSigmaCut(evalPopulation, 1)
const boltzmannPopulation = scaleBoltzmann(evalPopulation, 500)

console.table(evalPopulation.map(
    (x, i) => ({
        initial: x,
        sigma: sigmaCutPopulation[i],
        boltzmann: boltzmannPopulation[i]
    })
))

console.table(
    deterministicSelection(prepareCopyCounts(evalPopulation, n))
)