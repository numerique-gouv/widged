import { Button, useCunningham } from '@openfun/cunningham-react';

import './index.scss';

import React, { ReactNode } from 'react';

export interface BreadcrumbsProps {
  items: { content: ReactNode }[];
  onBack?: () => void;
  displayBack?: boolean;
}

export const Breadcrumbs = ({
  items,
  onBack,
  displayBack = true,
}: BreadcrumbsProps) => {
  return (
    <div className="c__breadcrumbs">
      {displayBack && (
        <Button
          icon={<span className="material-icons">arrow_back</span>}
          color="tertiary"
          className="mr-t"
          onClick={onBack}
          disabled={items.length <= 1}
        >
          {/*{t('components.breadcrumbs.back')}*/}
          Back
        </Button>
      )}

      {items.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="material-icons clr-greyscale-500">
                chevron_right
              </span>
            )}
            {item.content}
          </React.Fragment>
        );
      })}
    </div>
  );
};
