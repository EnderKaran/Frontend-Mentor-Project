import { useContext } from "react";
import { FormContext } from "@/context/FormContext";

export default function PersonalInfo() {
  const { formData, setFormData, errors } = useContext(FormContext);

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      personalInfo: { ...formData.personalInfo, [field]: value }
    });
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Başlık ve Açıklama  */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[hsl(213,96%,18%)] mb-2">Personal info</h2>
        <p className="text-[hsl(231,11%,63%)]">Please provide your name, email address, and phone number.</p>
      </div>

      <div className="space-y-6">
        {/* Name Input  */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <label className="text-[hsl(213,96%,18%)] font-medium">Name</label>
            {errors.name && (
              <span className="text-[hsl(354,84%,57%)] font-bold">{errors.name}</span>
            )}
          </div>
          <input
            type="text"
            placeholder="e.g. Stephen King"
            value={formData.personalInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`border rounded-lg p-3 font-ubuntu font-medium outline-none transition-colors ${
              errors.name ? "border-[hsl(354,84%,57%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          />
        </div>

        {/* Email Input  */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <label className="text-[hsl(213,96%,18%)] font-medium">Email Address</label>
            {errors.email && (
              <span className="text-[hsl(354,84%,57%)] font-bold">{errors.email}</span>
            )}
          </div>
          <input
            type="email"
            placeholder="e.g. stephenking@lorem.com"
            value={formData.personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`border rounded-lg p-3 font-ubuntu font-medium outline-none transition-colors ${
              errors.email ? "border-[hsl(354,84%,57%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          />
        </div>

        {/* Phone Input  */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm font-medium">
            <label className="text-[hsl(213,96%,18%)] font-medium">Phone Number</label>
            {errors.phone && (
              <span className="text-[hsl(354,84%,57%)] font-bold">{errors.phone}</span>
            )}
          </div>
          <input
            type="tel"
            placeholder="e.g. +1 234 567 890"
            value={formData.personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`border rounded-lg p-3 font-ubuntu font-medium outline-none transition-colors ${
              errors.phone ? "border-[hsl(354,84%,57%)]" : "border-[hsl(229,24%,87%)]"
            }`}
          />
        </div>
      </div>
    </div>
  );
}