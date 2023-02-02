import View from './View';

class TransferView extends View {
  _path = '/transfer';
  parentElement = document.querySelector('.main-view-handler');
  sidebarButtonId = document.getElementById('transfer-tokens');
  targetFormElementId = 'form-transfer';

  createMarkup() {
    return `<form class="tokens--sender" id="form-transfer">
    <div class="tokens--sender--box">
      <label for="amount">Amount</label>
      <div>
        <input
          name="amount"
          type="number"
          id="send--to--input--amount"
          placeholder="Input token amount"
          step=".0001"
          required
          autofocus
        />
        <select name="Tokens">
          <option value="ETH">ETH</option>
        </select>
      </div>
    </div>
    <div class="tokens--sender--box">
      <label for="address">Send to address</label>
      <input
        name="address"
        type="text"
        id="send--to--input--address"
        size="50"
        placeholder="0x123..."
        required
      />
    </div>
    <button type="submit" id="send--btn">Send</button>
  </form>`;
  }

  displayInfoMessage() {
    return `<div class="message">Address must have at least 42 characters and start with '0x'</div>`;
  }

  takeSendToData() {
    const coinAmount = document.getElementById('send--to--input--amount').value;
    const receiverAddress = document.getElementById(
      'send--to--input--address'
    ).value;

    if (
      receiverAddress.length === 42 &&
      typeof coinAmount !== 'String' &&
      coinAmount > 0.0001
    ) {
      return [coinAmount, receiverAddress];
    } else {
      return this.displayInfoMessage();
    }
  }
}

export default new TransferView();
