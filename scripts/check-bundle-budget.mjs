import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist", "assets");

const limits = {
  maxTotalJsBytes: 1700 * 1024,
  maxSingleJsBytes: 850 * 1024,
  maxTotalCssBytes: 250 * 1024,
};

if (!fs.existsSync(distDir)) {
  console.error("Bundle budget check failed: dist/assets directory not found. Run build first.");
  process.exit(1);
}

const files = fs.readdirSync(distDir, { withFileTypes: true }).filter((entry) => entry.isFile());
const jsFiles = files.filter((entry) => entry.name.endsWith(".js"));
const cssFiles = files.filter((entry) => entry.name.endsWith(".css"));

const toSize = (entry) => fs.statSync(path.join(distDir, entry.name)).size;

const jsBySize = jsFiles
  .map((entry) => ({ name: entry.name, size: toSize(entry) }))
  .sort((a, b) => b.size - a.size);

const cssBySize = cssFiles
  .map((entry) => ({ name: entry.name, size: toSize(entry) }))
  .sort((a, b) => b.size - a.size);

const totalJsBytes = jsBySize.reduce((sum, file) => sum + file.size, 0);
const totalCssBytes = cssBySize.reduce((sum, file) => sum + file.size, 0);
const largestJs = jsBySize[0];

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;
const failures = [];

if (totalJsBytes > limits.maxTotalJsBytes) {
  failures.push(
    `Total JavaScript size ${formatKiB(totalJsBytes)} exceeds budget ${formatKiB(limits.maxTotalJsBytes)}.`,
  );
}

if (largestJs && largestJs.size > limits.maxSingleJsBytes) {
  failures.push(
    `Largest JavaScript chunk (${largestJs.name}) is ${formatKiB(largestJs.size)}, exceeding ${formatKiB(limits.maxSingleJsBytes)}.`,
  );
}

if (totalCssBytes > limits.maxTotalCssBytes) {
  failures.push(
    `Total CSS size ${formatKiB(totalCssBytes)} exceeds budget ${formatKiB(limits.maxTotalCssBytes)}.`,
  );
}

console.log("Bundle size summary:");
console.log(`- Total JS: ${formatKiB(totalJsBytes)}`);
console.log(`- Total CSS: ${formatKiB(totalCssBytes)}`);
if (largestJs) {
  console.log(`- Largest JS chunk: ${largestJs.name} (${formatKiB(largestJs.size)})`);
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`Budget violation: ${failure}`);
  }
  process.exit(1);
}

console.log("Bundle budgets passed.");
