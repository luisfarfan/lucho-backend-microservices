export interface CommonResponse {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}
