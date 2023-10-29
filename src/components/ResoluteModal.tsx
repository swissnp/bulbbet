import Link from "next/link";
const ResoluteModal = ({
  modalId,
  data,
  onClick,
}: {
  modalId: string;
  data: { isAgree: boolean };
  onClick: () => void;
}) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        {data && (
          <div>
            <h3 className="text-2xl font-bold">Resolution Confirmed 🤙🏻</h3>
            <p className="py-4">
              You voted: {data.isAgree ? "Yes ✅" : "No ❌"}
            </p>
            {/* <table className="table">
              <thead>
                <tr>
                  <th className="text-lg font-bold">Bet on</th>
                  <th className="text-lg font-bold">Price</th>
                  <th className="text-lg font-bold">Shares</th>
                  <th className="text-lg font-bold">Total</th>
                </tr>
                <tr>
                  <td
                    className={`text-lg font-bold ${
                      data.isAgree ? "text-success" : "text-error"
                    }`}
                  >
                    {data.isAgree ? "Yes ✅" : "No ❌"}
                  </td>
                  <td className="text-lg font-normal">
                    {
                      +(
                        data.isAgree ? data.agreePrice : 100 - data.agreePrice
                      ).toFixed(2)
                    }
                  </td>
                  <td className="text-lg font-normal">{data.shareAmount}</td>
                  <td className="text-lg font-normal">
                    {+data.totalPrice.toFixed(2)}
                  </td>
                </tr>
              </thead>
            </table> */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={onClick}>
                  Go to Home
                </button>
              </form>
              <Link className="btn btn-primary" href="/history/events">
                View Your Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};
export default ResoluteModal;
