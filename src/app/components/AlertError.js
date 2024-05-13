export default function AlertError({ isVisible, message }) {
  if (!isVisible) return null;
  return (
    <div className="top-16 toast toast-top toast-end">
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
}
