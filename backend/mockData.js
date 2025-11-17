// mockData.js
// Stores sessions and histories in memory (no DB). For the assignment that's fine.

module.exports = {
  initialSessions: [
    // Example pre-existing session
    {
      id: "sess-1",
      title: "Sales Q1 Summary",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: "sess-2",
      title: "Inventory Report",
      createdAt: Date.now() - 1000 * 60 * 60 * 24
    }
  ],

  // Provide a function returning a sample table response
  sampleAnswer(question) {
    // Example: return structured columns and rows plus descriptive text
    const table = {
      columns: ["Product", "Units Sold", "Revenue", "Return %"],
      rows: [
        ["Alpha", 1200, 24000, "2.5%"],
        ["Beta", 850, 17000, "1.8%"],
        ["Gamma", 430, 8600, "0.9%"]
      ]
    };

    const info = `Mock answer for: "${question}". This table shows top product metrics.`;

    return { info, table };
  }
};
