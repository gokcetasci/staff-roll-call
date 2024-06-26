"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaChevronCircleDown, FaChevronDown, FaChevronUp } from "react-icons/fa";

const EmployeeFilter = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Aktif çalışan index'i
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    // Tüm sayfa üzerindeki tıklamaları dinle
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Event listener'ı temizle
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Arama sonucunda filtrelenmiş çalışanları al
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ekranda görüntülenen çalışanlar
  const displayedEmployees = filteredEmployees.slice(
    activeIndex,
    activeIndex + 4
  );

  // Sonraki çalışanları gösterme işlevi
  const handleNext = () => {
    if (activeIndex + 4 < filteredEmployees.length) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Önceki çalışanları gösterme işlevi
  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Arama terimini güncelleme işlevi
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Arama terimi boşsa dropdown'u gizle, değilse göster
    if (e.target.value.trim() === "") {
      setDropdownVisible(false);
    } else {
      setDropdownVisible(true);
    }
  };

  return (
    <div className="relative mt-7" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Çalışan ara..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 hover:border-blue-500"
      />
      <div
        className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md z-10 overflow-hidden"
        style={{ display: dropdownVisible ? "block" : "none" }}
      >
        <ul className="divide-y divide-gray-300">
          {displayedEmployees.map((employee) => (
            <li key={employee.id}>
              <Link href={`/employee/${employee.id}`}>
                <span className="block px-4 py-2 hover:bg-gray-100">
                  {employee.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {filteredEmployees.length > 4 && (
          <div className="flex justify-between px-4 pb-2">
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={handlePrev}
            >
              <FaChevronUp className="h-5 w-5 transition duration-300 ease-in-out transform hover:scale-105" />
            </button>
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={handleNext}
            >
              <FaChevronDown className="h-5 w-5 transition duration-300 ease-in-out transform hover:scale-105" />
            </button>
          </div>
        )}
      </div>
      <FaChevronCircleDown
        className="absolute top-5 right-3 transform -translate-y-1/2 h-5 w-5 text-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      />
    </div>
  );
};

export default EmployeeFilter;
