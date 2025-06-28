import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useState, ChangeEvent } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Хук для работы с формами
export function useForm<T extends { [key: string]: string }>(baseForm: T) {
  const [form, setForm] = useState<T>(baseForm);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const element = e.target;
    setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
  }

  // Функция для обновления конкретного поля
  function setFieldValue(field: keyof T, value: string) {
    setForm((pastForm) => ({ ...pastForm, [field]: value }));
  }

  return [form, handleChange, setFieldValue] as const;
}
