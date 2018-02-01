export const imgurl = (width, path) => {
  return path
    ? 'https://image.tmdb.org/t/p/' + width + path
    : ''
}
