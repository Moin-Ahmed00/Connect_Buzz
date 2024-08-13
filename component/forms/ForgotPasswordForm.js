const ForgotPasswordForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <small>
          <label className="text-muted">E-mail Address</label>
        </small>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="form-control"
          placeholder="Enter Your E-mail"
        />
      </div>
      <div className="form-group my-2">
        <small>
          <label className="text-muted">New Password</label>
        </small>
        <input
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          type="password"
          className="form-control"
          placeholder="Enter New Password"
        />
      </div>
      <div className="form-group my-2">
        <small>
          <label className="text-muted">Select a question</label>
        </small>
        <select className="form-control">
          <option>What's your favourite colour?</option>
          <option>What's your father's name?</option>
          <option>In what city you were born?</option>
        </select>
        <small>
          <label className="text-muted">
            You can use this to reset your password if forgotten
          </label>
        </small>
      </div>
      <div className="form-group my-2">
        <input
          value={secret}
          onChange={(e) => {
            setSecret(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Enter your answer"
        />
      </div>
      <div className="form-group">
        <button
          disabled={!email || !newPassword || !secret || loading}
          className="btn btn-primary w-100"
        >
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
