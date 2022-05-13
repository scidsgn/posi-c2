export function exportToCSV(data: {
    [key: string]: number[]
}) {
    const lines: string[] = []
    const keys = Object.keys(data)

    lines.push(keys.join(","))
    
    const n = data[keys[0]].length

    for (let i = 0; i < n; i++) {
        lines.push(keys.map(key => data[key][i]).join(","))
    }

    return lines.join("\n")
}