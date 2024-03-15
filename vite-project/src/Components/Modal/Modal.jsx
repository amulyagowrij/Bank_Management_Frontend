import "./Modal.scss";
const Modal = ({ isOpen, onClose, onConfirm, formData, children }) => {
  if (!isOpen) return null;
  const handleFromSubmit = (e) => {
    e.preventDefault();
    const account_pin = e.target.accountpin.value;
    onConfirm({ ...formData, account_pin });
  };
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <form onSubmit={handleFromSubmit} className="form-container">
          <div>
            <label htmlFor="accountpin">Account Pin</label>
            <input type="password" id="accountpin" name="accountpin" required />
            <div className="buttons">
              <button onClick={onClose}>Cancel</button>
              <button type="submit">Transfer</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
