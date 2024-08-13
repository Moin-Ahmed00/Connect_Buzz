const CommentForm = ({ comment, setComment, addComment }) => {
  return (
    <form onSubmit={addComment}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment"
        type="text"
        className="form-control"
      />
      <button className="btn btn-sm btn-primary btn-block mt-3">Submit</button>
    </form>
  );
};

export default CommentForm;
