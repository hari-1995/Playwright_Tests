// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 *1000,
  expect:{
    timeout: 30 *1000,
  },
 reporter: "html",
  use: {
    browserName: "chromium",
    headless : false,
    trace: 'retrain-on-failure',
    screenshot: 'on',
  },

  
});
module.exports = config;

