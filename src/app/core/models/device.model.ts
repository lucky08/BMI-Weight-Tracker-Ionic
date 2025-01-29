export interface Device {
  id?: number;
  uuid: string;
  isVirtual?: boolean;
  model?: string;
  operatingSystem?: string;
  osVersion?: string;
  platform?: string;
  webViewVersion?: string;
}
