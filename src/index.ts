import { avg, F2, rand2d } from "./utils";

// Random population of 100x2
const population = rand2d(100, 2, -2.048, 2.048)
const evalPopulation = population.map(x => F2(x[0], x[1]))

console.table(avg(evalPopulation))