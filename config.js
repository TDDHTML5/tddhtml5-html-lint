module.exports = {
  html: {
    lint: {
      files: {
        src: [
          "index.html"
        ],
        exclude: [
          "test",
          "spec"
        ]
      },
      severity: 0 // 0:STRUCTURE (least strict), 1:HELPER, 2:FLUFF (most strict)
    }
  }
};