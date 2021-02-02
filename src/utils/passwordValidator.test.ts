import { validatePassword } from "./passwordValidator"

describe("passwordValidator", () => {
  it("should flag not long enough", () => {
    const validation = validatePassword("one")
    expect(validation.result).toBe(false)
    expect(validation.passes.minLength).toBe(false)
  })

  it("should flag not enough Lowercase", () => {
    const validation = validatePassword("ONE")
    expect(validation.result).toBe(false)
    expect(validation.passes.minLowercase).toBe(false)
  })

  it("should flag not enough Uppercase", () => {
    const validation = validatePassword("1ad2$assiefOa!")
    expect(validation.result).toBe(false)
    expect(validation.passes).toEqual({
      minLength: true,
      minLowercase: true,
      minNumbers: true,
      minUppercase: false,
    })
  })

  it("should flag not enough Numbers", () => {
    const validation = validatePassword("CUFS$KsNIefOa!")
    expect(validation.result).toBe(false)
    expect(validation.passes).toEqual({
      minLength: true,
      minLowercase: true,
      minNumbers: false,
      minUppercase: true,
    })
  })

  it("should pass a strong password", () => {
    const validation = validatePassword("N8w@XVqbm8hN1HIif9%NvX^kx6&g90xV")
    expect(validation.result).toEqual(true)
  })
})
