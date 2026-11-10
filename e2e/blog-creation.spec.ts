import { expect, test } from '@playwright/test';

const adminToken =
  'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxIiwiZXhwIjo0MTAyNDQ0ODAwfQ.';

const adminUser = encodeURIComponent(
  JSON.stringify({
    id: 1,
    firstName: 'E2E',
    lastName: 'Admin',
    role: 0,
    email: 'e2e@example.test',
  }),
);

test.describe('blog creation', () => {
  test('creates a blog with five bilingual headers and large content', async ({ page, context }) => {
    await context.addCookies([
      { name: 'token', value: adminToken, url: 'http://127.0.0.1:4200' },
      { name: 'userSignedIn', value: adminUser, url: 'http://127.0.0.1:4200' },
    ]);

    let submittedBody = '';
    let createRequestCount = 0;
    await page.route('**/Blogs**', async (route) => {
      const request = route.request();
      if (request.method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            isSuccess: true,
            data: { data: [], page: 1, pageSize: 10, totalCount: 0, totalPages: 1 },
          }),
        });
        return;
      }

      if (request.method() === 'POST') {
        createRequestCount++;
        submittedBody = request.postData() ?? '';
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ isSuccess: true, message: 'Blog created', data: { id: 101 } }),
        });
        return;
      }

      await route.continue();
    });

    await page.goto('/en/configurations/blogs');
    await page.getByRole('button', { name: 'Add a blog' }).click();
    await expect(page.getByText('Maximum 200 characters.').first()).toBeVisible();
    await expect(page.getByText('Maximum 500 characters.').first()).toBeVisible();

    await page.locator('input[formControlName="nameEng"]').fill('Cairo Travel Guide');
    await page.locator('input[formControlName="nameAr"]').fill('دليل السفر إلى القاهرة');
    await page.locator('input[formControlName="metaTitleEng"]').fill('Cairo Travel Guide');
    await page.locator('input[formControlName="metaTitleAr"]').fill('دليل السفر إلى القاهرة');
    await page.locator('input[formControlName="routeName"]').fill('cairo-travel-guide');
    await page.locator('textarea[formControlName="DescriptionEng"]').fill('A detailed Cairo travel summary.');
    await page.locator('textarea[formControlName="DescriptionAr"]').fill('ملخص تفصيلي عن السفر إلى القاهرة.');
    const addSectionButton = page.getByRole('button', { name: /Add section/ });
    for (let index = 1; index < 5; index++) await addSectionButton.click();

    const sections = page.locator('article');
    await expect(sections).toHaveCount(5);

    const englishParagraph =
      'This is intentionally large English blog content used to verify that the editor accepts a complete article section with multiple sentences, travel details, practical advice, and enough text to exercise the real creation flow.';
    const arabicParagraph =
      'هذا محتوى عربي طويل لاختبار إنشاء مقال كامل مع تفاصيل السفر والنصائح العملية ومعلومات كافية للتحقق من تدفق إنشاء المقال فعليًا.';
    const englishContent = Array.from({ length: 6 }, () => englishParagraph).join(' ');
    const arabicContent = Array.from({ length: 6 }, () => arabicParagraph).join(' ');

    for (let index = 0; index < 5; index++) {
      const section = sections.nth(index);
      await section.locator('input[formControlName="headerEng"]').fill(`Cairo Highlights ${index + 1}`);
      await section.locator('input[formControlName="headerAr"]').fill(`أبرز معالم القاهرة ${index + 1}`);
      await section.locator('.ql-editor').nth(0).fill(`${englishContent} Section ${index + 1}.`);
      await section.locator('.ql-editor').nth(1).fill(`${arabicContent} القسم ${index + 1}.`);
    }

    await page.getByRole('button', { name: 'Create blog' }).click();
    await expect(page.getByRole('alert').filter({ hasText: 'At least one blog image is required.' })).toBeVisible();
    expect(createRequestCount).toBe(0);

    await page.locator('#blog-images').setInputFiles({
      name: 'cairo.png',
      mimeType: 'image/png',
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
        'base64',
      ),
    });
    await page.locator('input[placeholder*="English alt"]').fill('Cairo skyline');
    await page.locator('input[placeholder*="Arabic alt"]').fill('أفق القاهرة');

    const createRequest = page.waitForRequest(
      (request) => request.method() === 'POST' && /\/Blogs\/?$/i.test(request.url()),
    );
    await page.getByRole('button', { name: 'Create blog' }).click();
    await createRequest;

    for (let index = 0; index < 5; index++) {
      expect(submittedBody).toContain(`HeaderData[${index}].HeaderEng`);
      expect(submittedBody).toContain(`Cairo Highlights ${index + 1}`);
      expect(submittedBody).toContain(`HeaderData[${index}].HeaderAr`);
      expect(submittedBody).toContain(`أبرز معالم القاهرة ${index + 1}`);
      expect(submittedBody).toMatch(new RegExp(`Section(?:&nbsp;|\\s)+${index + 1}`));
      expect(submittedBody).toMatch(new RegExp(`القسم(?:&nbsp;|\\s)+${index + 1}`));
    }
  });
});
