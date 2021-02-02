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
      groupName: {
        type: "string",
      },
      name: {
        type: "string",
        default: "Unnamed Scrap...",
      },
      labels: {
        type: "array",
        uniqueItems: true,
        items: {
          type: "string",
        },
      },
      contentType: {
        type: "string",
        default: "markdown",
      },
      content: {
        type: "string",
        default: "New Scrap...",
      },
      starred: {
        type: "boolean",
        default: false,
      },
      locked: {
        type: "boolean",
        default: false,
      },
      archived: {
        type: "boolean",
        default: false,
      },
    },
    required: ["id", "created", "name"],
    indexes: ["id", "created", "name"],
    encrypted: ["name", "content"],
    attachments: {
      encrypted: true,
    },
  },
}
