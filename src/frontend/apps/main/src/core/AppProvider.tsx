import { CunninghamProvider } from '@openfun/cunningham-react';

import '@/i18n/initI18n';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <CunninghamProvider theme="dsfr">{children}</CunninghamProvider>;
}
