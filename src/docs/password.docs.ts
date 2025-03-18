/**
 * @swagger
 * /forgot:
 *   post:
 *     summary: Retorna as informações da senha do usuário autenticado
 *     tags: [Password Methods]
 *     responses:
 *       200:
 *         description: Envio de email com instruções de redefinição de senha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Email do usuário
 *               required:
 *                 - email
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Redefine a senha do usuário autenticado
 *     tags: [Password Methods]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de redefinição de senha
 *               password:
 *                 type: string
 *                 description: Nova senha do usuário
 *               password_confirmation:
 *                 type: string
 *                 description: Confirmação da nova senha do usuário
 *             required:
 *               - token
 *               - password
 *               - password_confirmation
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
