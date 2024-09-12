export function getTimer(seconds: number): string {
    const newDate = new Date(seconds * 1000)
    const formattedTime = newDate.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    return formattedTime
}