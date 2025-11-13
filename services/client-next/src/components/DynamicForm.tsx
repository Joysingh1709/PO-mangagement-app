"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

type Field = {
  id: number;
  name: string;
  fieldType: string;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required?: boolean;
  listOfValues1?: string[];
};

export default function DynamicForm({ fields }: { fields: Field[] }) {
  const { register, handleSubmit, control, reset, formState } = useForm({
    defaultValues: fields.reduce((acc, f) => {
      acc[f.name] = f.defaultValue ?? "";
      return acc;
    }, {} as Record<string, any>),
  });

  useEffect(() => {
    // try to load saved values from localStorage
    try {
      const raw = localStorage.getItem("signup_form_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        reset(parsed);
      }
    } catch (e) {
      // ignore
    }
  }, [reset]);

  const onSubmit = (data: any) => {
    // persist to localStorage
    localStorage.setItem("signup_form_v1", JSON.stringify(data));
    alert("Saved: " + JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl space-y-6 rounded-lg bg-white/70 p-8 shadow-lg backdrop-blur-lg animate-fade-in"
    >
      {fields.map((f) => {
        const key = f.name;
        const label = f.name;
        const required = !!f.required;

        if (f.fieldType === "TEXT") {
          return (
            <div key={f.id} className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">{label}{required ? " *" : ""}</label>
              <input
                {...register(key, {
                  required: required ? "This field is required" : false,
                  minLength: f.minLength ? { value: f.minLength, message: `Min ${f.minLength}` } : undefined,
                  maxLength: f.maxLength ? { value: f.maxLength, message: `Max ${f.maxLength}` } : undefined,
                })}
                defaultValue={f.defaultValue ?? ""}
                className="rounded-md border border-gray-200 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          );
        }

        if (f.fieldType === "LIST") {
          return (
            <div key={f.id} className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">{label}{required ? " *" : ""}</label>
              <Controller
                control={control}
                name={key}
                rules={{ required: required ? "This field is required" : false }}
                render={({ field: ctrlField }) => (
                  <select
                    {...ctrlField}
                    defaultValue={f.defaultValue ?? ""}
                    className="rounded-md border border-gray-200 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select</option>
                    {f.listOfValues1?.map((opt, i) => (
                      <option key={i} value={String(i + 1)}>
                        {opt}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          );
        }

        if (f.fieldType === "RADIO") {
          return (
            <div key={f.id} className="flex flex-col">
              <span className="mb-2 text-sm font-medium text-gray-700">{label}{required ? " *" : ""}</span>
              <Controller
                control={control}
                name={key}
                rules={{ required: required ? "This field is required" : false }}
                render={({ field: ctrlField }) => (
                  <div className="flex gap-4">
                    {f.listOfValues1?.map((opt, i) => (
                      <label key={i} className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          value={String(i + 1)}
                          checked={ctrlField.value === String(i + 1)}
                          onChange={() => ctrlField.onChange(String(i + 1))}
                          className="h-4 w-4"
                        />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              />
            </div>
          );
        }

        return null;
      })}

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            reset(fields.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue ?? "" }), {}));
            localStorage.removeItem("signup_form_v1");
          }}
          className="rounded-lg border border-gray-200 px-6 py-3 text-sm hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
