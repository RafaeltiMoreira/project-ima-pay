export const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export const valueFormatter = (value: number): string =>
  Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
