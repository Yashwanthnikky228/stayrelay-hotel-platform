import type { Money } from '@stayrelay/domain';

export function formatMoney(money: Money, locale = 'en-IN'): string {
  const amount = money.amountMinor / 100;
  const fractionDigits = money.amountMinor % 100 === 0 ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}
