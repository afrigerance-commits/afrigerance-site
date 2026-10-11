/* Export éditorial reproductible. Utilise la dépendance TypeScript du projet. */
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, filename);
const root = path.resolve(__dirname, "..");
const { siraEvents, siraQuestionCount } = require(path.join(root, "src/lib/data/sira.ts"));
const sources = [...new Map(siraEvents.flatMap(event => event.sources).map(source => [source.id, source])).values()];
const bodyWords = siraEvents.reduce((total, event) => total + event.lesson.sections.flatMap(section => section.paragraphes).join(" ").split(/\s+/).length, 0);
const introduction = `# MIRÂTH — Parcours original de Sîra

Version préparée le 11 octobre 2026. Non déployée.

${siraEvents.length} chapitres couvrant les grandes périodes, ${bodyWords.toLocaleString("fr-FR")} mots de leçons, ${siraQuestionCount} questions corrigées, ${sources.length} références distinctes.

Rédaction originale indépendante du Nectar cacheté. Les faits sont reformulés ; les commentaires sont identifiés. Les points ouverts ne sont pas racontés comme certains. Cette version ne constitue pas une biographie exhaustive ni une validation savante.

## Sommaire

${siraEvents.map((event, index) => `${index + 1}. ${event.titre}`).join("\n")}

`;
const chapters = siraEvents.map((event, index) => `## ${index + 1}. ${event.titre}

${event.periode} · ${event.dateApproximative}

**Objectif :** ${event.presentation}

${event.lesson.sections.map(section => `### ${section.titre}\n\n${section.paragraphes.join("\n\n")}`).join("\n\n")}

**Portée et points ouverts :** ${event.vigilance}

### À retenir

${event.lesson.retenir.map(point => `- ${point}`).join("\n")}

### Exercice

${event.lesson.exercice}

**Proposition de correction :** ${event.lesson.correction}

### Questions corrigées

${event.lesson.questions.map(question => `- ${question.question}\n  - Réponse : ${question.options[question.answer]}\n  - Explication : ${question.explanation}`).join("\n")}

### Références

${event.lesson.ressources.map(resource => `- [${resource.label}](${resource.href})`).join("\n")}`).join("\n\n");
fs.writeFileSync(path.join(root, "docs/SIRA_PARCOURS_20261011.md"), introduction + chapters + "\n");
console.log(JSON.stringify({ chapters: siraEvents.length, questions: siraQuestionCount, bodyWords, references: sources.length }));
