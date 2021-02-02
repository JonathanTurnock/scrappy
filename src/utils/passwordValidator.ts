import validator from "validator"

export const validatePassword = (password: string) => {
  const minLength = validator.isLength(password, {
    min: 12,
  })

  const minLowercase = validator.matches(password, /[a-z]{2}/)

  const minUppercase = validator.matches(password, /[A-Z]{2}/)

  const minNumbers = validator.matches(password, /[0-9]{2}/)

  return {
    result: minLength && minLowercase && minUppercase && minNumbers,
    passes: {
      minLength,
      minLowercase,
      minUppercase,
      minNumbers,
    },
  }
}
