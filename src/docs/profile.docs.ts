/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna as informações do perfil do usuário autenticado
 *     tags: [Profile:Details]
 *     responses:
 *       200:
 *         description: Informações do perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                   description: URL da imagem de avatar do usuário
 *       401:
 *         description: Não autorizado. O usuário precisa estar autenticado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Atualiza as informações do perfil do usuário autenticado
 *     tags: [Profile:Update]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Novo nome do usuário
 *               email:
 *                 type: string
 *                 description: Novo email do usuário
 *             required:
 *               - name
 *               - email
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado. O usuário precisa estar autenticado
 *       500:
 *         description: Erro interno do servidor
 */
