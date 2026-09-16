// Instagram DM Integration Utility for Little Gift Studio

export const INSTAGRAM_HANDLE = 'little.gift.studio._';
export const INSTAGRAM_PROFILE_URL = 'https://instagram.com/little.gift.studio._';
export const INSTAGRAM_DM_URL = 'https://ig.me/m/little.gift.studio._';

/**
 * Copies message text to clipboard and opens Instagram DM
 */
export async function openInstagramDM(messageText = '') {
  if (messageText && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(messageText);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  }

  // Open Instagram Direct Message in new tab
  window.open(INSTAGRAM_DM_URL, '_blank');
}

/**
 * Format & open single product order inquiry in Instagram DM
 */
export async function orderProductViaInstagram(product, selectedColor = '', customNote = '', qty = 1) {
  const colorText = selectedColor ? `\n🎨 Color Theme: ${selectedColor}` : '';
  const noteText = customNote ? `\n💌 Card Note: "${customNote}"` : '';

  const message = `🌸 Hi Little Gift Studio!

I would like to order:
🛍️ Product: ${product.name} (Qty: ${qty})${colorText}
💰 Price: ₹${product.price * qty}${noteText}

Please confirm availability and shipping timeline! ✨`;

  await openInstagramDM(message);
}

/**
 * Format & open cart hamper order in Instagram DM
 */
export async function orderCartViaInstagram(items, subtotal, deliveryPincode = '', globalGiftNote = '') {
  const itemsSummary = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}${
          item.selectedColor ? ` [Color: ${item.selectedColor}]` : ''
        }${item.customNote ? ` [Note: "${item.customNote}"]` : ''}`
    )
    .join('\n');

  const message = `🌸 Hi Little Gift Studio!

I would like to place an order from your website hamper cart:

🛍️ Items:
${itemsSummary}

---------------------------
💰 Total Amount: ₹${subtotal}
📦 Delivery Pincode: ${deliveryPincode || 'Not specified'}
💌 Card Message: ${globalGiftNote ? `"${globalGiftNote}"` : 'Complimentary aesthetic card'}

Please share payment details (UPI/GPay) and estimated delivery date! ✨`;

  await openInstagramDM(message);
}

/**
 * Format & open custom bouquet builder order in Instagram DM
 */
export async function orderCustomBouquetViaInstagram({ flowerNames, themeName, wrapName, addonNames, recipientNote, totalPrice }) {
  const message = `🌸 Hi Little Gift Studio!

I designed a custom bouquet on your website studio builder:

💐 Flower Stems: ${flowerNames}
🎨 Color Theme: ${themeName}
🎀 Wrapping Style: ${wrapName}
✨ Add-ons: ${addonNames}
💌 Gift Note: "${recipientNote}"

💰 Estimated Price: ₹${totalPrice}

Please confirm custom color stems and delivery availability! ✨`;

  await openInstagramDM(message);
}

/**
 * Format & open general inquiry in Instagram DM
 */
export async function sendInquiryViaInstagram(name, contact, inquiryMsg) {
  const message = `🌸 Hi Little Gift Studio!

👤 Name: ${name}
📱 Contact: ${contact || 'Not provided'}
💬 Inquiry: "${inquiryMsg}"

Looking forward to hearing from you! ✨`;

  await openInstagramDM(message);
}
