import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Configuração do Studio. projectId/dataset vêm de env (SANITY_STUDIO_*),
// preenchidos após `sanity login` e criação do projeto na nuvem do Sanity.
export default defineConfig({
  name: "domi",
  title: "Domi — Conteúdo",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "development",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
