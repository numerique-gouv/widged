import {
  FileAudio,
  FileCss,
  FileCsv,
  File as FileDefault,
  FileDoc,
  FileImage,
  FilePdf,
  FilePpt,
  FileSvg,
  FileTxt,
  FileVideo,
  FileXls,
  FileZip,
  Icon,
} from '@phosphor-icons/react';
import { ReactElement } from 'react';

import { File } from '@/types/data';

const EXTENSION_ICON_MAP: Record<string, Icon> = {
  /* Documents */
  pdf: FilePdf,
  docx: FileDoc,
  pages: FileDoc,
  xlsx: FileXls,
  csv: FileCsv,
  ppt: FilePpt,
  text: FileTxt,
  zip: FileZip,
  css: FileCss,

  /* Audio */
  mp3: FileAudio,
  wav: FileAudio,
  aac: FileAudio,
  wma: FileAudio,
  ogg: FileAudio,
  flac: FileAudio,

  /* Video */
  mp4: FileVideo,
  mkv: FileVideo,
  avi: FileVideo,
  mov: FileVideo,
  wmv: FileVideo,
  flv: FileVideo,
  webm: FileVideo,
  mpeg: FileVideo,

  /* Images */
  jpg: FileImage,
  jpeg: FileImage,
  png: FileImage,
  gif: FileImage,
  svg: FileSvg,
  webp: FileImage,
  bmp: FileImage,
};

export const FileIcon = ({ file }: { file: File }) => {
  const extension = file.name.split('.').pop();
  console.log('FileIcon', file.name, extension);

  if (!extension) {
    return <FileDefault />;
  }

  const Icon = EXTENSION_ICON_MAP[extension];
  if (!Icon) {
    return <FileDefault />;
  }
  return <Icon />;
};
