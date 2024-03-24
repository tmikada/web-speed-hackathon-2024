import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { GetTermsRequestQuerySchema } from '@wsh-2024/schema/src/api/terms/GetTermsRequestQuery';
import { GetTermsResponseSchema } from '@wsh-2024/schema/src/api/terms/GetTermsResponse';

import { TERM } from './Term';
import { CONTACT } from './Contact';
import { QUESTION } from './Question';
import { COMPANY } from './Company';
import { OVERVIEW } from './Overview';

const app = new OpenAPIHono();

const route = createRoute({
  method: 'get',
  path: '/api/v1/terms/{id}',
  request: {
    params: GetTermsRequestQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetTermsResponseSchema,
        },
      },
      description: 'Get Terms.',
    },
  },
  tags: ['[App] Features API'],
});

app.openapi(route, async (c) => {
  const params = c.req.valid('param');
  let res;
  if(params.id == '1') {
    res = { terms: TERM};
  }
  if(params.id == '2') {
    res = { terms: CONTACT};
  }
  if(params.id == '3') {
    res = { terms: QUESTION};
  }
  if(params.id == '4') {
    res = { terms: COMPANY};
  }
  if(params.id == '5') {
    res = { terms: OVERVIEW};
  }

  return c.json(res);
});

export { app as getTermsApp };
