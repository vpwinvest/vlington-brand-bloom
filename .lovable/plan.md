# Atualizar projetos: Bridge House vendido, Abyss House em destaque, novo projeto Camacha

## 1. Bridge House — Vendido
- Marcar como vendido (aparece o selo "Vendido" e deixa de mostrar "Sob consulta").
- Passa a aparecer na grelha normal de projetos, junto dos outros.

## 2. Abyss House — Em destaque
- Passa a ser o projeto grande no topo da secção "Projetos em Destaque", com o mesmo conteúdo, fotos e detalhes que já tem.

## 3. Novo projeto: Camacha — Ericeira
Criado a partir do estudo prévio (OVIUR Arquitectura, 22/06/2026):
- **Nome:** Camacha Residences (ou outro nome à sua escolha)
- **Local:** Rua da Camacha, Lote 03 — Ericeira, Mafra
- **Tipo:** Edifício de apartamentos — 12 frações (T2 e T3)
- **Áreas:** apartamentos de cerca de 129 m² a 162 m²; ~912 m² de construção habitacional em 4 pisos
- **Destaques:** varandas generosas, terraços no último piso (~167 m²), garagem na cave (~500 m²), sala de condomínio, closets nos quartos, fachada contemporânea em alumínio a imitar madeira, vidro e tons cinza/antracite
- **Estado:** Em projeto / Lançamento · Preço: Sob consulta
- **Imagens:** as 3 imagens exteriores (renders) do PDF como foto principal e galeria
- **Mapa e proximidades:** localização na Ericeira, distâncias a Lisboa/aeroporto, praias (Ribeira d'Ilhas, Foz do Lizandro), surf
- Textos em português e inglês.

## Detalhes técnicos
- Edição em `src/components/ProjectsSection.tsx`: `featured` passa a Abyss House; Bridge House entra na `list` com `sold: true`; novo objeto `camacha` com traduções EN.
- Renders extraídos do PDF (páginas 1–3) carregados como assets CDN (`.asset.json`).
- Plantas técnicas não são publicadas (contêm nomes e referências do gabinete).
