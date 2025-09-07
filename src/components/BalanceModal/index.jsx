import "./BalanceModal.css";
import "../ModalWindow.css";
const numberFormatter = new Intl.NumberFormat(navigator.language);

function BalanceModal({
  isActive,
  onClose,
  balances,
  lpBalances,
  onAddLiquidity,
  onRemoveLiquidity,
}) {
  if (!isActive) return null;

  return (
    <div className="balance-modal-overlay">
      <div className="balance-modal-window modal-window">
        <button className="balance-modal-close modal-close" onClick={onClose}>
          ✖️
        </button>

        <h2 className="balance-modal-title modal-title">LP Balances</h2>
        <div className="balance-modal-table-wrapper">
          <table className="balance-modal-table">
            <thead>
              <tr>
                <th>Pool</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lpBalances?.map((lp) => (
                <tr key={lp.poolId}>
                  <td>
                    {lp.emoji} {lp.name}
                  </td>
                  <td>{lp.amount}</td>
                  <td>
                    <button
                      className="balance-modal-action add"
                      onClick={() => onAddLiquidity(lp.poolId)}
                    >
                      Add
                    </button>
                    <button
                      className="balance-modal-action remove"
                      onClick={() => onRemoveLiquidity(lp.poolId)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="balance-modal-title modal-title">Memoji Balances</h2>
        <div className="balance-modal-table-wrapper">
          <table className="balance-modal-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {balances?.map((bal) => (
                <tr key={bal.denom}>
                  <td>
                    {bal.emoji} {bal.name}
                  </td>
                  <td>{numberFormatter.format(bal.amountRaw)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BalanceModal;
