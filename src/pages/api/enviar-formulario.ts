

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, empresa, whatsapp, email, comentario } = req.body;

  // Validação simples
  if (!nome || !email || !empresa || !whatsapp) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  try {
    const response = await fetch('https://hook.us2.make.com/vh4nrowuglpwslsyyvpjmty9idq9vjkd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, empresa, whatsapp, email, comentario }),
    });

    if (!response.ok) {
      throw new Error('Erro no webhook');
    }

    return res.status(200).json({ message: 'Sucesso' });
  } catch (error) {
    console.error('Erro ao enviar para Make:', error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
