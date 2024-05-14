export default function AlertSuccess({ isVisible, message }) {
  if (!isVisible) return null;
  return (
    <div className="animate-bounce top-20 toast toast-top toast-end">
      <div className="text-slate-950 dark:text-slate-200 outline-none border-no animate-gradient-x bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br alert">
        <span>{message}</span>
      </div>
    </div>
  );
}
