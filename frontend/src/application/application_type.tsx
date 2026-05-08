export type Application = {
    id?: number
    name: string
    sector: string
    founders: string[]
    founderEmail: string
    founderPhoneNumber: string
    targetRound: string
    deckFilename?: string
    deckContentType?: string
    additionalComments?: string
    status: string
    submittedAt: string
}