# Form-Cadastros

🚀 1. Pré-requisitos

Antes de começar, você precisa ter instalado:

Node.js (versão 16 ou superior):
https://nodejs.org

npm (já incluso no Node)

Para confirmar se estão instalados:

node -v
npm -v

📦 2. Instalar o Playwright

No diretório do seu projeto, rode:

npm init -y


Depois instale o Playwright:

npm install -D @playwright/test


E instale os browsers necessários:

npx playwright install

📁 3. Estrutura do projeto

Seu projeto deve ficar parecido com isto:

/meu-projeto
|── index.html
|── estilo.css
|── script.js
|
|── tests/
│   ├── cadastro.spec.js
|
└── README.md


Os arquivos de teste devem ficar dentro da pasta tests/.

🧪 4. Criar um teste exemplo

Arquivo: tests/cadastro.spec.js

import { test, expect } from '@playwright/test';

test('Cadastro de usuário', async ({ page }) => {
  await page.goto('file:///CAMINHO/ATÉ/index.html');

  await page.fill('#name', 'Vitor');
  await page.fill('#email', 'vitor@gmail.com');
  await page.fill('#password', '12345');

  await page.click('#btnCadastrar');

  const lista = page.locator('#user-list');
  await expect(lista).toContainText('Vitor');
});


IMPORTANTE: Substitua o caminho do arquivo local conforme seu computador.

Exemplo:

file:///C:/Users/Aluno_Tarde/Desktop/formCadastro/formCadastro/index.html

▶️ 5. Rodar os testes

Para executar todos os testes:

npx playwright test


Para ver os testes rodando no navegador (modo UI):

npx playwright test --ui


Para rodar um teste específico:

npx playwright test tests/cadastro.spec.js

📊 6. Ver o relatório dos testes

Depois de rodar qualquer teste:

npx playwright show-report


Isso abrirá um relatório visual com:

Status dos testes

Logs

Prints de falha

Vídeos (se configurado)

🔧 7. Configuração opcional (playwright.config.js)

Para facilitar, você pode criar um arquivo:

playwright.config.js

// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true
  }
};
