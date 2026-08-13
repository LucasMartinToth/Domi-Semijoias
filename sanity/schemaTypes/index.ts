import type { SchemaTypeDefinition } from "sanity";

/*
  Schemas de conteúdo da Domi.

  BOOTSTRAP: ainda sem schemas definitivos — só a base do Studio.

  Conforme o CLAUDE.md, na sessão de conteúdo entram (títulos/descrições em
  pt-BR, pois quem edita não é técnico):
    - banner(s) da home
    - vitrine de destaques (referência a produtos por handle/ID do Medusa)
    - textos institucionais (quem somos, trocas e devoluções, guia de banhos)
    - páginas de campanha
    - posts de blog

  Regra: layout vive no código; o Sanity guarda só conteúdo estruturado.
  Adicione cada tipo a este array.
*/
export const schemaTypes: SchemaTypeDefinition[] = [];
