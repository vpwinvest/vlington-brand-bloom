# Atualizar o projeto Camacha com os dados reais

## No site (ficha do Camacha, PT e EN)
- **Preço:** mantém-se "Sob consulta".
- **Estado:** "Vendas abrem em 2027 · Construção em 18 meses" (substitui "Em Projeto — Lançamento").
- **Vista mar:** acrescentar à descrição e às características ("Apartamentos com vista mar").
- **4.º andar:** "2 apartamentos com piscina privada na varanda" como destaque na descrição e nas características.
- **Mapa:** passar a usar a localização exata do link enviado (38.967141, -9.409976).
- Corrigir o texto para refletir 5 níveis (cave + 4 pisos), coerente com o 4.º andar.

## Para a campanha
- Guardar estes factos na memória do projeto (preço sob consulta, vendas em 2027, 18 meses de obra, vista mar, 2 apartamentos com piscina na varanda) para os anúncios só usarem informação confirmada.
- Acrescentar uma nota ao relatório da concorrência: o Camacha também tem vista mar e um diferencial claro (piscina na varanda), e com vendas só em 2027 os anúncios devem pedir "registe o seu interesse / receba a brochura" em vez de venda imediata.
- Depois, continuar com a escolha de onde correm os anúncios.

## Detalhes técnicos
- Editar o objeto `camacha` em `src/components/ProjectsSection.tsx` (coordinates, details.status, description, features).
- Nova memória `mem://projects/camacha` + linha no índice.
- Atualizar `/mnt/documents/marketing/competitor_research.html` via script (backup antes, verificação depois).
