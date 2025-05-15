import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState([]);
  const supervisors = [
    { id: 1, name: "أحمد", phone: "0793021625", role: "مشرف" },
    { id: 2, name: "سعيد", phone: "0771873397", role: "مشرف" },
    { id: 3, name: "فاطمة", phone: "0792593020", role: "مكتب" },
  ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const printSelected = () => {
    const data = supervisors.filter((s) => selected.includes(s.id));
    if (data.length === 0) {
      window.print();
    } else {
      const content = data
        .map((s) => `<div><strong>${s.name}</strong> - ${s.phone} - ${s.role}</div>`)
        .join("");
      const printWindow = window.open("", "", "height=600,width=800");
      printWindow.document.write("<html><head><title>طباعة</title></head><body>");
      printWindow.document.write(content);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">لوحة المشرفين</h1>
      <div>
        {supervisors.map((sup) => (
          <div
            key={sup.id}
            onClick={() => toggleSelect(sup.id)}
            className={`p-3 mb-2 border rounded cursor-pointer ${
              selected.includes(sup.id) ? "bg-blue-200" : "bg-white"
            }`}
          >
            <div><strong>الاسم:</strong> {sup.name}</div>
            <div><strong>الهاتف:</strong> {sup.phone}</div>
            <div><strong>الدور:</strong> {sup.role}</div>
          </div>
        ))}
      </div>
      <button
        onClick={printSelected}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        طباعة المحدد
      </button>
    </div>
  );
}