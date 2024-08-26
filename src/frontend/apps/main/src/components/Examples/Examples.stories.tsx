import {
  Alert,
  Checkbox,
  FileUploader,
  Input,
  Select,
  Switch,
  TextArea,
  VariantType,
} from '@openfun/cunningham-react';
import type { Meta } from '@storybook/react';

import { Button } from '@/components/Button/Button';

const meta = {
  title: 'Examples',
} satisfies Meta;

export default meta;

export const Debug = {
  render: () => {
    return <div>Hi :)</div>;
  },
};
export const Application = () => {
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '500px',
      }}
      method="get"
    >
      <h1
        className="fs-h3 fw-bold clr-greyscale-900"
        style={{ textAlign: 'center' }}
      >
        Application
      </h1>
      <Alert additional="Additional informations">Important information</Alert>
      <Alert additional="Additional informations" type={VariantType.SUCCESS}>
        Important information
      </Alert>
      <Alert additional="Additional informations" type={VariantType.WARNING}>
        Important information
      </Alert>
      <Alert additional="Additional informations" type={VariantType.ERROR}>
        Important information
      </Alert>
      <Select
        label="Context"
        options={[
          {
            label: 'Ask a document',
          },
          {
            label: 'Download files',
          },
          {
            label: 'Ask for help',
          },
        ]}
        fullWidth={true}
        clearable={true}
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Input label="First name" state="error" text="Wrong first name" />
        <Input label="Last name" state="success" text="Congratz !" />
      </div>
      <Input
        label="Email address"
        fullWidth={true}
        text="Only @acme.com domain is authorized"
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ width: '25%' }}>
          <Input label="ZIP" fullWidth={true} />
        </div>
        <Input label="City" fullWidth={true} />
      </div>
      <div>
        <div className="fs-l clr-greyscale-800 mb-t">Your curriculum vitae</div>
        <FileUploader
          fullWidth={true}
          text="pdf only ( 4mb maximum )"
          accept="application/pdf"
        />
      </div>
      <Select
        label="Skills"
        options={[
          {
            label: 'Communication',
          },
          {
            label: 'Teamwork',
          },
          {
            label: 'Problem solving',
          },
          {
            label: 'Leadership',
          },
          {
            label: 'Work ethic',
          },
        ]}
        multi={true}
        fullWidth={true}
      />
      <div>
        <TextArea label="Cover letter" fullWidth={true} rows={5} />
      </div>
      <div>
        <Switch label="SMS Notification" fullWidth={true} />
        <Switch label="Subscribe to newsletter" fullWidth={true} />
      </div>
      <Checkbox label="Agree to the terms and services" fullWidth={true} />
      <Button fullWidth={true}>Apply</Button>
      <Button fullWidth={true} color="secondary">
        Later
      </Button>
      <a
        href="/#"
        className="clr-greyscale-800 fs-m"
        style={{ textAlign: 'center' }}
      >
        Need help ?
      </a>
    </form>
  );
};
