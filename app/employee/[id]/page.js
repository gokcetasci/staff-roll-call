"use client";
import React from "react";
import useStore from "@/utils/store";
import PersonalCalendar from "@/components/personalcalendar";
import { FcAssistant } from "react-icons/fc";

function EmployeePage({ params }) {
  const employeeId = parseInt(params.id);
  const { admin } = useStore();

  // Employee bulunamazsa mesaj döndür
  const employee = admin.branches
    .flatMap((branch) => branch.manager.employees)
    .find((emp) => emp.id === employeeId);
  if (!employee) return <div>Employee not found!</div>;

  // Employee'nin bağlı olduğu branch'i bul
  const branch = admin.branches.find((branch) =>
    branch.manager.employees.some((emp) => emp.id === employeeId)
  );

  return (
    <div className="w-full h-screen bg-slate-50">
      <div className="px-12 py-3 bg-gradient-to-r from-blue-400 to-indigo-200 flex flex-row items-center justify-between shadow-xl">
        <div className="flex flex-row items-center justify-center gap-4">
          <FcAssistant className="w-10 p-1 h-10 rounded-full border border-1 border-gray-500 bg-white" />
          <h2 className="font-extrabold text-blue-800">{employee.name}</h2>
        </div>
        <div className="flex flex-row gap-7">
          <p className="text-indigo-800">
            <span className="text-blue-800 font-bold">Şube:</span> {branch.name}
          </p>
          <p className="text-indigo-800">
            <span className="text-blue-800 font-bold">Müdür:</span>{" "}
            {branch.manager.name}
          </p>
        </div>
      </div>
      {/* PersonalCalendar bileşenini çağırıyoruz ve ilgili işçinin bilgilerini aktarıyoruz */}
      <PersonalCalendar employee={employee} />
      {/* Grafiksel Gösterim */}
      <div className="mt-4 flex flex-row items-center justify-center gap-2">
        <div className="w-6 h-6 bg-green-300 rounded-full"></div>
        <p>Geldi</p>
        <div className="w-6 h-6 bg-red-300 rounded-full"></div>
        <p>Gelmedi</p>
        <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
        <p>İzinli</p>
      </div>
    </div>
  );
}

export default EmployeePage;
