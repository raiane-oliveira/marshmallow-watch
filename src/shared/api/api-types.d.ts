export interface ApiErrorResponse {
  message: string
}

export interface ApiValidationErrorResponse extends ApiErrorResponse {
  issues: {
    [key: string]: string[]
  }
}

export interface Token {
  sub: string
  iat: number
  exp: number
}
