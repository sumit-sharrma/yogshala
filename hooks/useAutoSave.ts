"use client";

import { useEffect, useCallback } from "react";
import { FormData } from "@/lib/types";

const STORAGE_KEY = "yogshala-form-data";

export function useAutoSave(formData: FormData, setFormData: (data: FormData) => void) {
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [setFormData]);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const clearSaved = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { clearSaved };
}
