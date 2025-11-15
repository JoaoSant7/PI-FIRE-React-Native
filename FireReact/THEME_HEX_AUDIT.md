Relatório de Auditoria de Cores (HEX)
=====================================

Escopo: varredura em `FireReact/**` por literais hexadecimais (padrão `#xxx` ou `#xxxxxx`).
Objetivo: propor mapeamentos para tokens existentes em `contexts/ThemeContext.js`.

Resumo:
- Ocorrências encontradas: 152 (amostradas abaixo).
- Ações recomendadas: gerar e aplicar patches para substituir cores literais por referências ao `useTheme()` (`colors.*`).
- Estratégia proposta: aplicar substituições conservadoras por classes de cor (branco/preto/cinzas/vermelhos/fundos) e revisar manualmente casos ambíguos.

Mapeamentos sugeridos (heurística):
- Branco/claros (`#fff`, `#ffffff`, `#FFF`) -> use `colors.card` (para fundo) ou `colors.textOnPrimary` (para texto em botões). Revisar caso a caso.
- Preto/escuros (`#000`, `#000000`) -> use `colors.text` (texto principal) ou `colors.shadowColor` (sombra). Revisar contexto.
- Cinzas médias (`#666`, `#888`, `#999`, `#555`, `#777`) -> use `colors.textSecondary`.
- Cinzas de borda (`#ddd`, `#ccc`, `#e1e1e1`, `#e0e0e0`) -> use `colors.border`.
- Fundos claros (`#f8f8f8`, `#f9f9f9`, `#f5f5f5`, `#f0f0f0`, `#f1f1f1`) -> use `colors.surface`.
- Primários/vermelhos específicos (`#bc010c`, `#D32F2F`, `#bc010c` usados como destaque) -> use `colors.primary`.
- Status (verde/laranja/vermelho/azul): mapear para `colors.success`, `colors.warning`, `colors.error`, `colors.info`.
- Backdrops `rgba(0,0,0,0.5)` -> use `colors.backdrop`.

Ocorrências notáveis (exemplos com arquivos):
- `services/exportService.js` — já migrado para aceitar `colors` (fallbacks mantidos).
- `screens/NovaOcorrenciaScreen.jsx` — várias cores (ex.: `#bc010c`, `#f5f5f5`, `#ccc`, `#666`) — sugerir substituições para `colors.primary`, `colors.surface`, `colors.border`, `colors.textSecondary`.
- `screens/DetalhesOcorrenciaScreen.jsx` — usa retornos diretos de `getStatusColor` com `#FF9800`, `#4CAF50`, `#2196F3`, `#F44336`, `#757575` — substituir por `colors.warning`, `colors.success`, `colors.info`, `colors.error`, `colors.textSecondary`.
- `components/*` — diversos ícones e default props com `#000`, `#bc010c`, `#fff`.
- `App.js` e `contexts/ThemeContext.js` — contêm cores (acesse `ThemeContext` como fonte de verdade; `App.js` deve ser revisado para evitar duplicação).

Plano de patch sugerido (nível 1, conservador):
1) Substituir literais fáceis e seguros:
   - `#fff`, `#FFFFFF`, `"white"` em `color:` ou `backgroundColor:` para `colors.card` (background) ou `colors.textOnPrimary` (texto em botões). Aplicar apenas quando o contexto for claramente fundo ou texto de botão.
   - `#000`, `#000000` -> `colors.text` quando for `color` ou `shadowColor` preferir `colors.shadowColor`.
   - `#ccc`, `#ddd`, `#e1e1e1`, `#e0e0e0` -> `colors.border`.
   - `#f8f8f8`, `#f9f9f9`, `#f5f5f5` -> `colors.surface`.
   - `#bc010c`, `#D32F2F` -> `colors.primary`.
   - `#666`, `#888`, `#999`, `#555` -> `colors.textSecondary`.
2) Para ícones/SVGs com default props (ex.: `const HomeIcon = ({ color = "#000000" })`) — alterar para usar `useTheme()` e default para `colors.text`.
3) Para funções que retornam cores (ex.: `getStatusColor` em `DetalhesOcorrenciaScreen.jsx`) — substituir retornos hex por tokens correspondentes.

Próximos passos (opções):
- [A] Aplicar patch conservador automaticamente (substituições de nível 1) em todos os arquivos e abrir um relatório de mudanças (recomendado como primeiro passo).
- [B] Gerar um conjunto de patches por arquivo e pedir revisão manual antes de aplicar (mais seguro para projetos grandes).

Se deseja que eu aplique automaticamente (opção A), eu executarei as substituições de nível 1 agora e criarei commits locais (ou aplicarei diretamente os arquivos). Se preferir revisar antes, posso criar um arquivo `proposed_patches.md` contendo diffs para cada arquivo.

Observação: algumas substituições podem exigir pequenas alterações de import (ex.: `useTheme` em componentes utilitários). Aplicarei mudanças consistentes nessas situações.

---
Gerado automaticamente em: 15 de novembro de 2025
Gerador: auditoria de tokens de tema

