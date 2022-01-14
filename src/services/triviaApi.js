const getQuestions = async (userToken) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getQuestions;