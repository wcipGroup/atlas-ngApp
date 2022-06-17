export interface deviceStatus{
    devAddr: string
    devName: string
    temperature: number
    ph: number
    do: number
    wcfi: number
    conductivity: number
    date: Date
  }
export interface gwStatus{
    gwId: string
    gwName: string
    lastSeen: Date
}
