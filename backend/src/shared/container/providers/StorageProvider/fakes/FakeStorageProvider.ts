import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.files.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.files.findIndex(storageFile => storageFile === file);
    this.files.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
