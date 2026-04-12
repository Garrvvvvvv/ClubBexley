export default function FilePicker({ label, onChange }) {
  return (
    <div className="relative w-full group">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />

      <div className="w-full bg-white border border-gray-200 hover:border-[#CA0002] transition-colors rounded-xl px-4 py-3 text-gray-700 font-medium flex justify-between items-center shadow-sm">
        <span className="truncate mr-4">{label}</span>
        <span className="text-sm font-bold bg-gray-50 text-[#CA0002] border border-red-100 px-4 py-1.5 rounded-lg group-hover:bg-[#CA0002] group-hover:text-white transition-all whitespace-nowrap">
          Browse
        </span>
      </div>
    </div>
  );
}
