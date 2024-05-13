export default function AlertSuccess(props) {
  if (!props.isVisible) return <></>;
  return (
    <div className="top-16 toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{props.message}</span>
      </div>
    </div>
  );
}
