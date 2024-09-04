export enum ClientMessageType {
  SELECTION = 'SELECTION',
  CANCEL = 'CANCEL',
}

export class WidgedReverseClient {
  /**
   * TODO: Use API Key. Must be based on some sort of credentials ?
   */
  getAllowTargetOrigin() {
    return 'http://localhost:3010/consumer/';
  }

  post = (type: ClientMessageType, data: any = {}) => {
    // TODO: Make sure to use the correct origin.
    window.parent.postMessage(
      {
        type,
        data,
      },
      this.getAllowTargetOrigin(),
    );
  };
}
