import { ChangeEventHandler } from "react";
import {
	FieldValues,
	UseFormProps,
	UseFormReturn,
	useForm,
} from "react-hook-form";
import { defaultValuesStorage, setStorage } from "./commons";

const useFormHook = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues | undefined = undefined,
>(
	key: string,
	options?: UseFormProps<TFieldValues, TContext>,
) => {
	const { register: registerNative, ...others } = useForm({
		defaultValues: defaultValuesStorage(key),
		...options,
	});

	const register = (
		name: string,
		options?: Parameters<typeof registerNative>["1"],
	) => {
		const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
			if (options?.onChange) options.onChange(e);

			const obj = Object.fromEntries([[name, e.target.value]]);

			setStorage(key, obj);
		};

		return registerNative(name, { ...options, onChange });
	};

	return { register, ...others } as UseFormReturn<
		TFieldValues,
		TContext,
		TTransformedValues
	>;
};

export const createHook = (key: string) => {
	const useFormStorage = <
		TFieldValues extends FieldValues = FieldValues,
		TContext = any,
	>(
		options?: UseFormProps<TFieldValues, TContext>,
	) => useFormHook(key, options);

	return { useFormStorage };
};
