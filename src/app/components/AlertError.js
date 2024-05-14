export default function AlertError({ isVisible, message }) {
  if (!isVisible) return null;
  return (
    <div className="animate-bounce top-20 toast toast-top toast-end">
      <div className="text-slate-950 dark:text-slate-200 outline-none border-none animate-gradient-x alert bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br">
        <span>{message}</span>
      </div>
    </div>
  );
}
