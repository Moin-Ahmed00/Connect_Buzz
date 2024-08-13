const AuthForm = ({
  handleSubmit,
  profileUpdate,
  username,
  setUsername,
  about,
  setAbout,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {profileUpdate && (
        <div className="form-group my-2">
          <small>
            <label className="text-muted">Username</label>
          </small>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Your Username"
          />
        </div>
      )}
      {profileUpdate && (
        <div className="form-group my-2">
          <small>
            <label className="text-muted">About</label>
          </small>
          <input
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Tell us about Yourself"
          />
        </div>
      )}
      {page !== "login" && (
        <div className="form-group my-2">
          <small>
            <label className="text-muted">Your Name</label>
          </small>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
          />
        </div>
      )}

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
          disabled={profileUpdate}
        />
      </div>

      <div className="form-group my-2">
        <small>
          <label className="text-muted">Password</label>
        </small>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="form-control"
          placeholder="Enter Your Password"
        />
      </div>
      {page !== "login" && (
        <>
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
        </>
      )}
      <div className="form-group">
        <button
          disabled={
            profileUpdate
              ? loading
              : page === "login"
              ? !email || !password || loading
              : !name || !email || !password || !secret || loading
          }
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

export default AuthForm;
