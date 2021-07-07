export interface Exception {
  name?: string;
  message?: string;
}

export interface ImportError extends Exception {
  thrown: boolean;
}
