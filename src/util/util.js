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

export default router