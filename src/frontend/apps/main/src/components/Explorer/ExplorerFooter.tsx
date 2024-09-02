import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ClientMessageType } from '@/app/explorer/WidgedReverseClient';
import { AppContext } from '@/app/explorer/layout';
import { Button } from '@/components/Button/Button';
import { useExplorerContext } from '@/components/Explorer/Explorer';

export const ExplorerFooter = () => {
  const { t } = useTranslation();
  const { selectedFiles, props } = useExplorerContext();
  const { client } = useContext(AppContext);

  const choose = () => {
    client.post(ClientMessageType.SELECTION, {
      files: selectedFiles,
    });
  };

  const isValid = () => {
    if (props.maxFiles === undefined) {
      return true;
    }
    return selectedFiles.length <= props.maxFiles;
  };

  const canSubmit = () => {
    return selectedFiles.length > 0 && isValid();
  };

  const cancel = () => {
    client.post(ClientMessageType.CANCEL);
  };

  return (
    <div className="suite__explorer__footer">
      <div>
        {selectedFiles.length > 0 ? (
          <div>
            {t('explorer.footer.selected_items', {
              count: selectedFiles.length,
            })}
          </div>
        ) : (
          <div className="clr-greyscale-800">
            {t('Aucun document selectionné')}
          </div>
        )}
        {!isValid() && (
          <div className="clr-danger-500 fs-t">
            {t('explorer.footer.selected_items_max', {
              count: props.maxFiles,
            })}
          </div>
        )}
      </div>
      <div className="suite__explorer__footer__actions">
        <Button color="secondary" onClick={cancel}>
          {t('Annuler')}
        </Button>
        <Button color="primary" disabled={!canSubmit()} onClick={choose}>
          {t('Confirmer')}
        </Button>
      </div>
    </div>
  );
};
