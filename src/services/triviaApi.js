const getQuestions = async () => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getQuestions;