const NoteSchema = {
    type: ["object", "boolean"],
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      category: { type: "string" },
      created_at: { type: "string" },
      updated_at: { type: "string" }
    },
    required: ["id", "title", "description", "category", "created_at", "updated_at"]
};

module.exports = NoteSchema;
