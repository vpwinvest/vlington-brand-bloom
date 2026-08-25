# ScanSearch

Aplicação Windows para importar uma pasta com milhares de documentos digitalizados (scans),
pesquisar pelo **conteúdo** de cada documento (via OCR) ou pelo nome do ficheiro, pré-visualizar
o resultado e descarregar (guardar uma cópia) do documento encontrado.

Não tem qualquer relação com o site institucional da Vlington neste repositório — é um projeto
.NET independente, guardado nesta pasta apenas para efeitos de controlo de versão.

## Como funciona

- **Importar pasta**: percorre recursivamente uma pasta à procura de `.pdf`, `.jpg`, `.jpeg`,
  `.png`, `.tif`, `.tiff` e `.bmp`.
- **OCR**: cada imagem (ou cada página de um PDF, rasterizada a 300 DPI) é processada pelo motor
  [Tesseract](https://github.com/tesseract-ocr/tesseract) para extrair o texto.
- **Índice**: o texto extraído é guardado num índice de texto integral SQLite (FTS5), em
  `%LOCALAPPDATA%\ScanSearch\index.db`. Reimportar a mesma pasta só processa ficheiros novos ou
  alterados (comparação por data de modificação).
- **Pesquisa**: pesquisa por conteúdo do documento ou nome do ficheiro, sem distinguir
  maiúsculas/minúsculas nem acentos ("informacao" encontra "informação").
- **Selecionar e descarregar**: ao selecionar um resultado, é mostrada uma pré-visualização da
  primeira página. Os botões permitem abrir o ficheiro na aplicação predefinida do Windows,
  mostrá-lo no Explorador de Ficheiros, ou descarregá-lo (guardar uma cópia noutra pasta).

## Estrutura do projeto

```
windows-scan-search/
  ScanSearch.sln
  src/
    ScanSearch.Core/        Lógica: scanner de pastas, OCR, renderização de PDF, índice de pesquisa
    ScanSearch.App/         Interface gráfica (Avalonia UI)
    ScanSearch.Core.Tests/  Testes unitários e de integração (xUnit)
```

A interface usa [Avalonia UI](https://avaloniaui.net/) (framework .NET multiplataforma), publicada
como executável nativo do Windows (`ScanSearch.exe`) através de `dotnet publish -r win-x64`.

## Compilar e executar

Requer o [.NET SDK 8](https://dotnet.microsoft.com/download) ou superior.

```bash
cd windows-scan-search
dotnet build
dotnet test                                   # corre os testes automáticos
dotnet run --project src/ScanSearch.App       # executa a aplicação (Windows, ou Linux/macOS para testar a UI)
```

### Gerar o instalável/executável para Windows

A partir de qualquer sistema operativo com o .NET SDK instalado:

```bash
dotnet publish src/ScanSearch.App/ScanSearch.App.csproj -c Release -r win-x64 --self-contained true -o publish
```

Isto gera uma pasta `publish/` com `ScanSearch.exe` e todas as dependências (incluindo os binários
nativos do Tesseract, PDFium e SQLite para Windows x64) — basta copiar a pasta para o PC Windows e
executar `ScanSearch.exe`, sem necessidade de instalar o .NET.

## Idiomas de OCR

Os ficheiros de dados de idioma do Tesseract (`*.traineddata`, alguns MB cada) não vêm embutidos
no instalador. Na primeira execução, abra o painel **"Idiomas de OCR"** no topo da janela e
descarregue pelo menos um idioma (recomendado: **Português**) — a aplicação obtém o ficheiro
diretamente do repositório oficial `tesseract-ocr/tessdata_fast` e guarda-o em
`%LOCALAPPDATA%\ScanSearch\tessdata\`.

Se o PC não tiver acesso à Internet, os ficheiros `.traineddata` podem ser descarregados
manualmente a partir de https://github.com/tesseract-ocr/tessdata_fast e colocados nessa mesma
pasta (`por.traineddata`, `eng.traineddata`, etc.).

## Limitações conhecidas

- O OCR é feito localmente, ficheiro a ficheiro — a primeira importação de uma pasta com milhares
  de scans pode demorar (é proporcional ao número de páginas); importações seguintes só processam
  o que for novo ou tiver sido alterado.
- PDFs são sempre rasterizados e lidos por OCR (mesmo que já tenham uma camada de texto), para
  manter o processo simples e previsível.
- "Descarregar" copia o ficheiro original para o destino escolhido pelo utilizador — não há
  alteração de formato nem compressão.
