import { chromium, Browser, BrowserContext } from 'playwright';

export interface ScrapedData {
  providerName?: string;
  address?: string;
  city?: string;
  registeredCounty?: string;
  zipCode?: string;
  bedCount?: number | null;
  [key: string]: string | number | null | undefined;
}

export async function scrapeProviderData(): Promise<ScrapedData[]> {
  let browser: Browser | undefined;
  let context: BrowserContext | undefined;

  try {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://txhhs.my.site.com/TULIP/s/ltc-provider-search', {
      waitUntil: 'domcontentloaded',
    });

    // Select filters and fill search
    await page.getByRole('combobox', { name: 'Program Type' }).click();
    await page.getByText('Assisted Living Facilities (').click();
    await page.getByRole('combobox', { name: 'Service Type' }).click();
    await page.getByText('Type B Facilities').click();
    await page
      .getByRole('textbox', { name: 'Provider Name' })
      .fill('BROOKDALE CREEKSIDE');
    await page.getByRole('button', { name: 'Search' }).click();

    // Table XPath and row locators
    const tableBodyXPath =
      '/html/body/div[3]/div[1]/div/div/div/div/div[3]/div/div/div[2]/c-rs_-t-u-l-i-p_-l-t-c-search/div[2]/div[3]/div[1]/lightning-datatable/div[2]/div/div/table/tbody';

    const allRowsLocator = page.locator(`xpath=${tableBodyXPath}//tr`);
    await allRowsLocator.first().waitFor({ state: 'visible', timeout: 15000 });

    const columnHeaders = [
      'providerName',
      'address',
      'city',
      'registeredCounty',
      'zipCode',
    ];
    const rowCount = await allRowsLocator.count();
    const scrapedData: ScrapedData[] = [];

    for (let i = 0; i < rowCount; i++) {
      const rowData: ScrapedData = {};
      const row = allRowsLocator.nth(i);
      const cells = row.locator('th, td');

      // Provider name and link
      const firstCell = cells.nth(0);
      const linkLocator = firstCell.locator('a');
      rowData.providerName = await linkLocator.innerText();
      const linkUrl = await linkLocator.getAttribute('href');

      // Other columns
      for (let j = 1; j < columnHeaders.length; j++) {
        const cell = cells.nth(j);
        rowData[columnHeaders[j]] = (await cell.innerText()).trim();
      }

      // Scrape bed count from provider page
      if (linkUrl) {
        const newPage = await context.newPage();
        await newPage.goto(linkUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        });
        const bedCountLocator = newPage.getByRole('listitem', {
          name: 'Total Bed count',
        });
        await bedCountLocator.waitFor({ state: 'visible', timeout: 10000 });
        const bedCountText = await bedCountLocator.innerText();
        const numberMatch = bedCountText.match(/\d+/);
        rowData.bedCount = numberMatch ? parseInt(numberMatch[0], 10) : null;
        await newPage.close();
      } else {
        rowData.bedCount = null;
      }

      scrapedData.push(rowData);
    }

    return scrapedData;
  } catch (error) {
    console.error('Scraping failed:', error);
    throw error;
  } finally {
    if (context) await context.close();
    if (browser) await browser.close();
  }
}
