import EncryptedStorage from 'react-native-encrypted-storage';

export type CoreStoreItems = 'API_KEY' | 'USER_NAME';

export const CoreStore = {
  async storeItem(key: CoreStoreItems, value: string) {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {}
  },

  async getItem(key: CoreStoreItems): Promise<string> {
    try {
      return (await EncryptedStorage.getItem(key)) || '';
    } catch (error) {}
    return '';
  },
};
