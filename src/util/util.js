export const router = () => {
  const { hash } = window.location;

  const hashArr = hash.split("?");

  const pageInfo = hashArr[0] && hashArr[0].split("#/");
  const params = hashArr[1] && hashArr[1].split("&");

  let page = pageInfo[1] || "";
  if (page !== "") {
    if (page[0] === "/") {
      page = page.substr(1);
    }
  }

  const query = {};
  if (params && params.length) {
    params.forEach(item => {
      const arr = item.split("=");
      if (arr.length === 2) {
        const key = arr[0];
        const value = arr[1];
        query[key] = value;
      }
    });
  }
  return {
    page,
    query
  };
};

export const pushRoute = ({ page, query }) => {
  const a = router();

  const oldPage = a.page;
  const oldParams = a.params;

  const thisPage = page || oldPage;
  const thisPagrams = {
    ...oldParams,
    ...query
  };

  let newQuery = "";
  if (Object.keys(thisPagrams).length > 0) {
    Object.keys(thisPagrams).forEach((key, index) => {
      if (index === 0) {
        newQuery += "?";
      }
      if (index > 0) {
        newQuery += "&";
      }
      newQuery += `${key}=${thisPagrams[key]}`;
    });
  }
  if (!thisPage) {
    window.location.href = `/#/${newQuery}`;
  } else {
    window.location.href = `/#/${thisPage}/${newQuery}`;
  }
};

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
  return num.toFixed(len).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
}
