import { Input } from '@openfun/cunningham-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Form {
  terms: string;
}

export const SearchBar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const form = useForm<Form>();

  const onSearch = (values: Form) => {
    if (values.terms) {
      const params = new URLSearchParams();
      params.set('terms', values.terms);
      router.replace('/explorer/search?' + params.toString());
    } else {
      router.replace('/explorer');
    }
  };

  return (
    <div className="suite__explorer__search">
      <form
        onSubmit={form.handleSubmit(onSearch)}
        onBlur={form.handleSubmit(onSearch)}
      >
        <Input
          label={t('Rechercher un document')}
          icon={<span className="material-icons">search</span>}
          fullWidth={true}
          {...form.register('terms')}
        />
      </form>
    </div>
  );
};
