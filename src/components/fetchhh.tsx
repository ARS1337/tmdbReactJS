let getData = async (url: string) => {
  let base_url = "https://api.themoviedb.org/3";

  console.log(base_url + url);

  let temp = await fetch(base_url + url);
  return temp.json();
};
export default getData;
