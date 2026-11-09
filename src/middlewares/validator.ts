import type z from 'zod'

function validatorSchema<T>(schema: z.ZodObject, data: T) {
  const result = schema.safeParse(data)
  if (!result.success) {
    try {
      throw new ErrorServer('Erreur resolve', result.error.message, 404, false)
    } catch (error) {
      if (error instanceof ErrorServer) {
        const e = error.error as string
        console.log(JSON.parse(e))
      }
      throw error
    }
  }
  return data
}

class ErrorServer extends Error {
  statusCode: number
  success: boolean
  error: unknown
  data?: unknown

  constructor(
    message: string,
    error: unknown = null,
    statusCode = 500,
    success = false,
    data?: unknown,
  ) {
    super(message)

    this.name = 'ErrorServer'
    this.statusCode = statusCode
    this.success = success
    this.error = error
    this.data = data
  }
}

export { ErrorServer, validatorSchema }
