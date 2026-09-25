import { IconInbox } from './Icons'

/** Khối thông báo khi danh sách không có dữ liệu để hiển thị. */
export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <IconInbox className="mx-auto mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
      <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      {description && (
        <p className="mx-auto max-w-md text-sm text-slate-600 dark:text-slate-400">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
