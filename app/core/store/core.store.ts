import EncryptedStorage from 'react-native-encrypted-storage';

export type CoreStoreItems =
  | 'API_KEY'
  | 'API_MODEL'
  | 'USERNAME'
  | 'DEFAULT_CHAT_CONTEXT'
  | 'CONTEXTS'
  | 'LAST_UPDATED_CONTEXT_TIME'
  | 'CHAT_HISTORY';

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

  async storeObject(key: CoreStoreItems, obj: object) {
    try {
      this.storeItem(key, JSON.stringify(obj));
    } catch (error) {}
  },

  async getObject<T>(key: CoreStoreItems): Promise<T | undefined> {
    const serializedObject = await this.getItem(key);
    if (serializedObject) {
      try {
        return JSON.parse(serializedObject);
      } catch (err) {}
    }
    return undefined;
  },

  async remove(key: CoreStoreItems): Promise<void> {
    return EncryptedStorage.removeItem(key);
  },
};
