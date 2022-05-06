import { scaleBoltzmann, scaleSigmaCut } from "./scaling"
import { avg, evalF2, F2, rand2d } from "./utils"

// Random population of 100x2
const population = rand2d(100, 2, -2.048, 2.048)
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