import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Definindo as opções do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Vendas',
      version: '1.0.0',
      description:
        'Documentação da API para o gerenciamento de usuários e produtos.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },

  //   {
  //     name: 'Users Methods',
  //     description: 'Operações relacionadas aos usuários',
  //   },
  //   {
  //     name: 'Profile Methods',
  //     description: 'Operações relacionadas ao perfil do usuário',
  //   },
  //   {
  //     name: 'Password Methods',
  //     description: 'Operações relacionadas a senha do usuário',
  //   },
  // ],
  apis: ['./src/modules/**/routes/*.ts', './src/docs/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: any) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
