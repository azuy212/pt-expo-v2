import * as InAppPurchases from 'expo-in-app-purchases';

const {
  connectAsync,
  IAPResponseCode,
  getProductsAsync,
  setPurchaseListener,
  finishTransactionAsync,
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
  async init() {
    const history = await connectAsync();
    if (history.responseCode === IAPResponseCode.OK) {

      // Set purchase listener
      setPurchaseListener(({ responseCode, results, errorCode }) => {
        // Purchase was successful
        if (responseCode === IAPResponseCode.OK) {
          results.forEach((purchase: any) => {
            if (!purchase.acknowledged) {
              console.log(`Successfully purchased ${purchase.productId}`);
              // Process transaction here and unlock content...

              // Then when you're done
              finishTransactionAsync(purchase, true);
            }
          });
        } else if (responseCode === IAPResponseCode.USER_CANCELED) {
          console.log('User canceled the transaction');
        } else if (responseCode === IAPResponseCode.DEFERRED) {
          console.log(
            'User does not have permissions to buy but requested parental approval (iOS only)',
          );
        } else {
          console.warn(`Something went wrong with the purchase. Received errorCode ${errorCode}`);
        }
      });

      return history.results ? history.results : [];
    }
    throw history.errorCode;
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
