function cookie(name) {
    if (typeof document === 'undefined')
        return '';
    const entry = document.cookie.split('; ').find(value => value.startsWith(`${name}=`));
    return entry ? decodeURIComponent(entry.split('=').slice(1).join('=')) : '';
}
function sourceCode(sourceCurrency) {
    if (typeof sourceCurrency === 'number' || /^\d+$/.test(String(sourceCurrency ?? '')))
        return Number(sourceCurrency) === 1 ? 'EGP' : 'USD';
    const value = String(sourceCurrency ?? 'USD').toUpperCase();
    return value.includes('EGP') || value.includes('EGYPT') ? 'EGP' : 'USD';
}
export function apiPrice(value, sourceCurrency = 'USD') {
    const price = Number(value ?? 0);
    if (!Number.isFinite(price))
        return 0;
    const source = sourceCode(sourceCurrency);
    const target = cookie('currency') || 'USD';
    if (source === target)
        return price;
    const rate = Number(cookie('usdToEgpRate'));
    if (!Number.isFinite(rate) || rate <= 0)
        return price;
    const converted = source === 'USD' && target === 'EGP' ? price * rate : price / rate;
    return Math.round((converted + Number.EPSILON) * 100) / 100;
}
export function apiCurrencyLabel(currencyId = 2) {
    const source = sourceCode(currencyId);
    const target = cookie('currency') || 'USD';
    const rate = Number(cookie('usdToEgpRate'));
    const canConvert = source === target || (Number.isFinite(rate) && rate > 0);
    const display = canConvert ? target : source;
    return display === 'EGP' ? 'EGP' : '$';
}
