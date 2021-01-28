import { hydrateSchema } from "./helpers"
import { resolve } from "path"

const expectedSchema = {
  schema: {
    title: "hero scrapsCollection",
    version: 0,
    description: "describes a simple hero",
    type: "object",
    properties: {
      name: {
        type: "string",
        primary: true,
      },
      color: {
        type: "string",
      },
      healthpoints: {
        type: "number",
        minimum: 0,
        maximum: 100,
      },
      skills: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            damage: {
              type: "number",
            },
          },
        },
      },
    },
    required: ["color"],
    encrypted: ["secret"],
    attachments: {
      encrypted: true,
    },
  },
}

describe("hydrateSchemas", () => {
  it("should hydrate the scrapsCollection from json file", async () => {
    const hydratedSchema = await hydrateSchema(
      resolve(__dirname, "./__stubs__/heroes.scrapsCollection.ts")
    )
    expect(hydratedSchema).toEqual(expectedSchema)
  })

  it("should hydrate the scrapsCollection from yaml file", async () => {
    const hydratedSchema = await hydrateSchema(
      resolve(__dirname, "./__stubs__/scrap.scrapsCollection.yml")
    )
    expect(hydratedSchema).toEqual(expectedSchema)
  })

  it("should hydrate the scrapsCollection from multiple yaml file", async () => {
    const hydratedSchema = await hydrateSchema(
      resolve(__dirname, "./__stubs__/heroes-with-ref.scrapsCollection.yml")
    )
    expect(hydratedSchema).toEqual(expectedSchema)
  })
})
