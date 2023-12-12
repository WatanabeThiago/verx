export default function cnpjValidator(cnpj: string): boolean {
  // Remova caracteres não numéricos
  cnpj = cnpj.replace(/\D/g, '');

  // Verifique se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Validação do CNPJ usando algoritmo
  const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let soma = 0;

  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos1[i];
  }

  const digitoVerificador1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (digitoVerificador1 !== parseInt(cnpj.charAt(12))) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * pesos2[i];
  }

  const digitoVerificador2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  return digitoVerificador2 === parseInt(cnpj.charAt(13));
}
