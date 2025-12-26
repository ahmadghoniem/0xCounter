import hre from "hardhat"

async function main() {
  console.log("--- HARDHAT CONFIG DEBUG ---")
  console.log("Project Root:", hre.config.paths.root)
  console.log("Sources:", hre.config.paths.sources)
  console.log("Artifacts:", hre.config.paths.artifacts)
  console.log("Cache:", hre.config.paths.cache)
  console.log("---------------------------")
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
