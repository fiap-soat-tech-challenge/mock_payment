function logger(status, message) {
  console.log(`[${new Date().toLocaleString('pt-BR')}] [${status}] ${message}`);
}

export default logger;
