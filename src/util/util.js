export const router = () => {
  const { hash } = window.location;

  console.log(hash)
  const hashArr = hash.split('?')

  const pageInfo = hashArr[0] && (hashArr[0]).split('#/');
  const params = hashArr[1] && hashArr[1].split('?')[1];

  const page  = pageInfo[1] || pageInfo[0] || ''

  return {
    page,
    params
  }
}

/**
 * 格式化数字
 * @param value
 * @param len 保留的长度
 */
export function formatNumber(value, len = 0) {
  if (!value || Number.isNaN(value)) {
    return value;
  }

  const num = parseFloat(value);
  return num.toFixed(len).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

