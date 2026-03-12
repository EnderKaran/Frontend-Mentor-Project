import { useContext, useState } from "react";
import { FormContext } from "@/context/FormContext";

export default function PersonalInfo() {
  const { formData, setFormData, setCurrentStep } = useContext(FormContext);
  
  // Hata mesajlarını yönetmek için lokal state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const { name, email, phone } = formData.personalInfo;

    
    if (!name.trim()) newErrors.name = "This field is required";
    
    if (!email.trim()) {
      newErrors.email = "This field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!phone.trim()) newErrors.phone = "This field is required";

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Başlık ve Açıklama */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[hsl(213,96%,18%)] mb-2">Personal info</h2>
        <p className="text-[hsl(231,11%,63%)]">Please provide your name, email address, and phone number.</p>
      </div>

      <div className="space-y-6">
        {/* Name Input */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <label className="text-[hsl(213,96%,18%)]">Name</label>
            {errors.name && <span className="text-[hsl(354,84%,57%)] font-bold">{errors.name}</span>}
          </div>
          <input
            type="text"
            placeholder="e.g. Stephen King"
            value={formData.personalInfo.name}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, name: e.target.value }
            })}
            className={`border rounded-lg p-3 font-ubuntu font-medium outline-none focus:border-[hsl(243,100%,62%)] transition-colors ${
              errors.name ? "border-[hsl(354,84%,57%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <label className="text-[hsl(213,96%,18%)]">Email Address</label>
            {errors.email && <span className="text-[hsl(354,84%,57%)] font-bold">{errors.email}</span>}
          </div>
          <input
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            value={formData.personalInfo.email}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, email: e.target.value }
            })}
            className={`border rounded-lg p-3 font-ubuntu font-medium outline-none focus:border-[hsl(243,100%,62%)] transition-colors ${
              errors.email ? "border-[hsl(354,84%,57%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          />
        </div>

        {/* Phone Input */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <label className="text-[hsl(213,96%,18%)]">Phone Number</label>
            {errors.phone && <span className="text-[hsl(354,84%,57%)] font-bold">{errors.phone}</span>}
          </div>
          <input
            type="tel"
            placeholder="e.g. +1 234 567 890"
            value={formData.personalInfo.phone}
            onChange={(e) => setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, phone: e.target.value }
            })}
            className={`border rounded-lg p-3 font-ubuntu font-medium outline-none focus:border-[hsl(243,100%,62%)] transition-colors ${
              errors.phone ? "border-[hsl(354,84%,57%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          />
        </div>
      </div>

      {/* Masaüstü Navigasyon Butonu */}
      <div className="hidden md:flex absolute bottom-0 right-0 p-10">
        <button
          onClick={handleNext}
          className="bg-[hsl(213,96%,18%)] text-white px-7 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}