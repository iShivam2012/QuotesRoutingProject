const FIREBASE_DOMAIN = "https://react-prep-default-rtdb.firebaseio.com";

export async function getAllQuotes(data) {
  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getSingleQuote(data, quoteId) {
  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  console.log("Data Sent! " + quoteData);
}

export async function addComment(requestData, data) {
  //   const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
  //     method: 'POST',
  //     body: JSON.stringify(requestData.commentData),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await response.json();

  //   if (!response.ok) {
  //     throw new Error(data.message || 'Could not add comment.');
  //   }

  return { commentId: data.name };
}

export async function getAllComments(quoteId, data) {
  //   const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  //   const data = await response.json();

  //   if (!response.ok) {
  //     throw new Error(data.message || 'Could not get comments.');
  //   }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
