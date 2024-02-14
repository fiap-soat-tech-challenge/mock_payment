import * as dotenv from 'dotenv';
import logger from "../utils/logger.js";

dotenv.config();

export const mudarStatusDePagamento = async (pagamentoId) => {
  const randomNumber = Math.floor(Math.random() * 2);
  let status = 'APROVADO';
  if (randomNumber === 1) {
    status = 'RECUSADO';
  }

  logger('info', `Enviando confirmação do pagamentoId ${pagamentoId} com status ${status}`);

  const response = await fetch(
    `http://${process.env.LACHONETE_HOST}:${process.env.LACHONETE_PORT}/api/pagamentos/processar`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pagamentoId, status: status }),
    },
  );

  logger('info', `PagamentoId ${pagamentoId} processado - Status code ${response.status} - ${response.statusText}`);

  if (response.status !== 200) {
    const data = await response.json();
    console.log(data);
  }
};
