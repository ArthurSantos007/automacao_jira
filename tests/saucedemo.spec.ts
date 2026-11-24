import { test, expect } from '@playwright/test';

test.describe('Fluxo de Autenticação - SauceDemo', () => {

  test('CT01 - Validar carregamento da página de login', async ({ page }) => {
    await page.goto('https://saucedemo.com');
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('CT02 - Login com sucesso usando usuário padrão', async ({ page }) => {
    await page.goto('https://saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('CT03 - Validar mensagem de erro com usuário bloqueado (Falha Proposital)', async ({ page }) => {
    await page.goto('https://saucedemo.com');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Falha proposital: esperamos o texto errado para simular um bug real e disparar a automação no Jira
    await expect(page.locator('[data-test="error"]')).toHaveText('Texto Incorreto Proposital');
  });

});
