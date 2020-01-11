import * as InAppPurchases from 'expo-in-app-purchases';

const {
  connectAsync,
  IAPResponseCode,
  getProductsAsync,
  setPurchaseListener,
  purchaseItemAsync,
} = InAppPurchases;

export const IAP_ITEMS: Record<string, string> = {
  'course.ixch': 'Chemistry Course for 9th Class',
  'course.xph': 'Physics Course for 10th Class',
  'course.xiph': 'Physics Course for 11th Class',
  'course.xich': 'Chemistry Course for 11th Class',
  'course.xiiph': 'Physics Course for 12th Class',
  'course.xiich': 'Chemistry Course for 12th Class',
  'course.cert.all': 'All Certificates',
  'cert.cert': 'Certificate Course for CERT',
  'cert.babok': 'Certificate Course for BABOK',
  'cert.bpmn': 'Certificate Course for BPMN',
  'cert.itil': 'Certificate Course for ITIL',
  'cert.req': 'Certificate Course for REQ',
  'cert.togaf': 'Certificate Course for TOGAF',
};

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
    const { responseCode, results, errorCode } = await getProductsAsync(Object.keys(IAP_ITEMS));
    if (responseCode === IAPResponseCode.OK) {
      return results ? results : [];
    }
    throw errorCode;
  }

  async purchaseItemAsync(itemId: string, oldItem?: string) {
    purchaseItemAsync(itemId, oldItem);
  }
}
