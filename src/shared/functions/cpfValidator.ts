export default function cpfValidator(cpf: string): boolean {
  // Remova caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');

  // Verifique se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Validação do CPF usando algoritmo
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = soma % 11;
  let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = soma % 11;
  let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

  return digitoVerificador2 === parseInt(cpf.charAt(10));
}
