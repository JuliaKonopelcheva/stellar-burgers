import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState, ChangeEvent, useCallback } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Хук для работы с формами
export function useForm<T extends { [key: string]: string }>(baseForm: T) {
  const [form, setForm] = useState<T>(baseForm);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
  }, []);

  // Функция для обновления конкретного поля
  const setFieldValue = useCallback((field: keyof T, value: string) => {
    setForm((pastForm) => ({ ...pastForm, [field]: value }));
  }, []);

  return [form, handleChange, setFieldValue] as const;
}
