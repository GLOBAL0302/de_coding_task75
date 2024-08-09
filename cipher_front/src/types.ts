export interface ICipherState {
  password: string;
  encodePhrase: string;
  decodePhrase: string;
  decode: boolean;
}

export interface IAllCipherState {
  password: string;
  phrase: string;
}
