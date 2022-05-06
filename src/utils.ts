export function F2(x1: number, x2: number) {
    return 100 * (x1**2 - x2)**2 + (1 - x1)**2
}

export function evalF2(x1: number, x2: number) {
    return 3910 - F2(x1, x2)
}

export function rand2d(x: number, y: number, min = 0, max = 1) {
    return Array(x).fill(0).map(
        _ => Array(y).fill(0).map(
            _ => Math.random() * (max - min) + min
        )
    )
}

export function avg(xs: number[]) {
    return xs.reduce((acc, x) => acc + x) / xs.length
}

export function stdev(xs: number[]) {
    const average = avg(xs)

    const sum = xs.reduce((acc, x) => acc + (x - average) ** 2)

    return Math.sqrt(sum / (xs.length - 1))
}