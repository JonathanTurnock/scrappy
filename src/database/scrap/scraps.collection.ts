export const scrapsCollection = {
  schema: {
    title: "Scrappy Scrap Schema",
    version: 0,
    description: "Scrap of information",
    type: "object",
    properties: {
      id: {
        type: "string",
        primary: true,
      },
      created: {
        type: "number",
      },
      name: {
        type: "string",
      },
      contentType: {
        type: "string",
      },
      content: {
        type: "string",
      },
      starred: {
        type: "boolean",
        default: false,
      },
      locked: {
        type: "boolean",
        default: false,
      },
    },
    required: ["id", "created"],
    indexes: ["id", "created", "name"],
    // encrypted: ["name", "content"],
  },
}
