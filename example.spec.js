import { test, expect } from '@playwright/test';


test('Verificar carregamento inicial e exibição dos elementos principais', async ({ page }) => {
  await page.goto('file:///C:/Users/Aluno_Tarde/Desktop/formCadastro/formCadastro/index.html');

  await expect(page.locator('#user-form')).toBeVisible();
  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#btnCadastrar')).toBeVisible();
});

test('Exibir erro ao tentar cadastrar com campos vazios', async ({ page }) => {
  await page.goto('file:///C:/Users/Aluno_Tarde/Desktop/formCadastro/formCadastro/index.html');

  await page.click('#btnCadastrar');


  const mensagem = page.locator('#error-message');
  await expect(mensagem).toBeVisible();
  await expect(mensagem).toHaveText('Por favor, preencha todos os campos.');
});



test('Cadastro com sucesso e mensagem exibida', async ({ page }) => {
  await page.goto('file:///C:/Users/Aluno_Tarde/Desktop/formCadastro/formCadastro/index.html');

  await page.fill('#name', 'João Silva');
  await page.fill('#email', 'joao@email.com');
  await page.fill('#password', 'senha1234');
  await page.click('#btnCadastrar');

  await expect(page.locator('#user-list')).toContainText('João Silva');
  await expect(page.locator('#user-list')).toContainText('joao@email.com');
});


test('Não permitir cadastro duplicado', async ({ page }) => {
  await page.goto('file:///C:/Users/Aluno_Tarde/Desktop/formCadastro/formCadastro/index.html');

  await page.fill('#name', 'Maria');
  await page.fill('#email', 'maria@email.com');
  await page.fill('#password', 'senha1234');
  await page.click('#btnCadastrar');

  await page.fill('#name', 'Maria');
  await page.fill('#email', 'maria@email.com');
  await page.fill('#password', 'senhaabcd');
  await page.click('#btnCadastrar');

  const lista = page.locator('#user-list');
  await expect(await lista.locator('text=Maria').count()).toBe(1);
});


test('Limpar a lista de cadastros', async ({ page }) => {
  await page.goto('file:///C:/Users/Aluno_Tarde/Desktop/formCadastro/formCadastro/index.html');


  await page.fill('#name', 'Lucas');
  await page.fill('#email', 'lucas@email.com');
  await page.fill('#password', 'senha1234');
  await page.click('#btnCadastrar');

  await page.click('#clear-list');

  await expect(page.locator('#user-list')).toBeEmpty();
});
