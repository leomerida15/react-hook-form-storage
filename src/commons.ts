import { FieldPath, FieldValues, PathValue } from "react-hook-form";

export const defaultValuesStorage = <
	TName extends FieldPath<TFieldValues>,
	TFieldValues extends FieldValues = FieldValues,
>(
	key: string,
): PathValue<TFieldValues, TName> | undefined => {
	const oldStorage = localStorage.getItem(key);

	if (!oldStorage) return undefined;

	return JSON.parse(oldStorage);
};

export const setStorage = (key: string, data: Record<string, unknown>) => {
	const oldStorage = localStorage.getItem(key);

	if (!oldStorage) return localStorage.setItem(key, JSON.stringify(data));

	const oldObj = JSON.parse(oldStorage);

	return localStorage.setItem(key, JSON.stringify({ ...oldObj, ...data }));
};
