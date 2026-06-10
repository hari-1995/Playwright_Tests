// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 1,
  workers: 3,
  timeout: 30 *1000,
  expect:{
    timeout: 30 *1000,
  },
 reporter: "html",
 projects: [
    {
      name: 'safari',
      use: {
        browserName: "webkit",
        headless : true,
        trace: 'retrain-on-failure',
        screenshot: 'on',
            },
    },
    {
      name: 'chrome',
      use: {
        browserName: "chromium",
        headless : false,
        trace: 'retrain-on-failure',
        screenshot: 'on',
        //viewport: { width: 720, height: 720 },
        //...devices['Galaxy A55 landscape'],
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation']





            },

    }
  ]


  
});
module.exports = config;

