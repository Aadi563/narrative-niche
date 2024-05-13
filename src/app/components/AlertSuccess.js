export default function AlertSuccess({ isVisible, message }) {
  if (!isVisible) return null;
  return (
    <div className="top-16 toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
}
