export default function AlertError(props) {
  if (!props.isVisible) return <></>;
  return (
    <div className="top-16 toast toast-top toast-end">
      <div className="alert alert-error">
        <span>{props.message}</span>
      </div>
    </div>
  );
}
