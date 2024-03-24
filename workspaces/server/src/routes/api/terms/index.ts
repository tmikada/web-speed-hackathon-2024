import { OpenAPIHono } from '@hono/zod-openapi';

import { getTermsApp } from './getTerms';

const app = new OpenAPIHono();

app.route('/', getTermsApp);

export { app as termsApp };
