import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  key = "123";

  constructor() { }

  public saveData(key: string, value: JSON) {
    let keys = localStorage.getItem("swift-key") || "{}";
    let parsedKeys = (JSON.parse(keys))
    parsedKeys[key] = true;
    localStorage.setItem("swift-key", JSON.stringify(parsedKeys));
    localStorage.setItem(key, this.encrypt(JSON.stringify(value)));
  }

  /**
   * get key specific data
   * @param key 
   * @returns 
   */
  public getData(key: string) {
    let data = localStorage.getItem(key) || "";

    let decryptedData = this.decrypt(data);
    return decryptedData.length > 0 ? JSON.parse(decryptedData) : decryptedData;
  }

  /**
   * get all data from local storage based on keys
   * @returns 
   */
  public getAllData() {
    let keys = localStorage.getItem("swift-key") || "{}";
    let parsedKeys = (JSON.parse(keys))
    let response: any[] = [];
    Object.keys(parsedKeys).forEach((key: string) => {
      response.push({ id: key, ...this.getData(key) });
    })
    return response;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
/**
 * encryption of the content 
 * @param txt 
 * @returns 
 */
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  /**
   * decryption of the content
   * @param txtToDecrypt 
   * @returns 
   */
  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
