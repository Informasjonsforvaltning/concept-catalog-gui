export default class ImportError {
  constructor(message: string, name?: string) {
    const error = Error(message);

    Object.defineProperty(error, 'message', {
      get() {
        return message;
      }
    });
    Object.defineProperty(error, 'name', {
      get() {
        return name ?? 'ImportError';
      }
    });
    return error;
  }
}
