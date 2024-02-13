import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { mudarStatusDePagamento } from '../../services/status.js';
import logger from "../../utils/logger.js";

export default async (request, response) => {
  const valor = request.body.valor;
  const pagamentoId = request.body.pagamentoId;

  logger('info', `Gerando QR Code para pagamentoId ${pagamentoId}`)

  const qrcodePagamento = {
    id: uuidv4(),
    valor: valor,
    pagamentoId: pagamentoId,
  };

  setTimeout(() => {
    mudarStatusDePagamento(pagamentoId);
  }, 10000);

  response.json({
    qrcode: await QRCode.toDataURL(JSON.stringify(qrcodePagamento)),
    ...qrcodePagamento,
  });
};
