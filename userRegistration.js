function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function saveUserToken(subscription) {
  console.log('subscription tokens :', subscription);
  const params = {
    author: JSON.parse(localStorage.user).name,
    content: JSON.stringify(subscription),
  };
  fetch('https://microblog-api.herokuapp.com/api/subscription', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(console.log);
}