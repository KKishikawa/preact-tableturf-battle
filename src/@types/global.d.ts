declare const NODE_ENV: 'development' | 'test' | 'production';

interface Navigator {
  msSaveBlob?: (blob: any, defaultName?: string) => boolean;
}
