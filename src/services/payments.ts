import * as InAppPurchases from 'expo-in-app-purchases';

const {
  connectAsync,
  IAPResponseCode,
  getProductsAsync,
  setPurchaseListener,
  purchaseItemAsync,
} = InAppPurchases;

const IAP_ITEMS = [
  'course.ixch',
  'course.xph',
  'course.xiph',
  'course.xich',
  'course.xiiph',
  'course.xiich',
  'course.cert.all',
];

export default class Payments {
  async init(purchaseListener: (result: any) => void) {
    try {
      const history = await connectAsync();
      if (history.responseCode === IAPResponseCode.OK) {
        // Set purchase listener
        console.log('setPurchaseListener');
        setPurchaseListener(purchaseListener);

        return history.results ? history.results : [];
      }
      throw history.errorCode;
    } catch (err) {
      if (err.message !== 'Already connected to App Store') {
        throw err;
      }
    }
  }

  async getProductsAsync() {
    /*
        These product IDs must match the item entries you created in the App Store Connect and Google Play Console.
        If you want to add more or edit their attributes you can do so there.
        */

    // Retrieve product details
    const { responseCode, results, errorCode } = await getProductsAsync(IAP_ITEMS);
    if (responseCode === IAPResponseCode.OK) {
      return results ? results : [];
    }
    throw errorCode;
  }

  async purchaseItemAsync(itemId: string, oldItem?: string) {
    purchaseItemAsync(itemId, oldItem);
  }
}
