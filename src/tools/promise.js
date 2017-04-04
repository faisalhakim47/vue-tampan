export function getPromiseState(promise) {
  return Promise.race([
    Promise.all([promise, Promise.resolve()]).then(() => 'fulfilled', () => 'rejected'),
    Promise.resolve().then(0).then(() => 'pending')
  ])
}
