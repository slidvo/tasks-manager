export class BackendError extends Error {
  constructor(message: string = 'Что-то пошло не так, попробуйте снова') {
    super(message);
  }
}
