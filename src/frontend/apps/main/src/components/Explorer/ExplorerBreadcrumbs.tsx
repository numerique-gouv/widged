import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button/Button';
import { useExplorerContext } from '@/components/Explorer/Explorer';
import { Folder } from '@/types/data';

export interface Crumb {
  href: string;
  name: string;
}

export const ExplorerBreadcrumbs = () => {
  const router = useRouter();
  const { crumbs } = useExplorerContext();
  const { t } = useTranslation();
  const getBreadcrumbs = () => {
    const usedCrumbs: Crumb[] = [
      {
        name: t('Mes espaces'),
        href: '/explorer',
      },
      ...crumbs,
    ];

    return usedCrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Breadcrumbs
      displayBack={false}
      items={[
        ...breadcrumbs.map((ancestor) => ({
          content: (
            <Button
              color="tertiary-text"
              size="small"
              onClick={() => router.push(ancestor.href)}
            >
              {ancestor.name}
            </Button>
          ),
        })),
      ]}
    />
  );
};
