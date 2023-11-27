import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { setStorage } from './commons';

const useControllerHook = <
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues
>(
  key: string,
  params: UseControllerProps<TFieldValues, TName>
) => {
  const controller = useController(params);

  const onChangeNative = controller.field.onChange;

  controller.field.onChange = e => {
    const obj = Object.fromEntries([[params.name, e.target.value]]);

    setStorage(key, obj);

    onChangeNative(e);
  };
};

export const createHookController = (key: string) => {
  const useControllerStorage = <
    TName extends FieldPath<TFieldValues>,
    TFieldValues extends FieldValues = FieldValues
  >(
    params: UseControllerProps<TFieldValues, TName>
  ) => useControllerHook(key, params);

  return { useControllerStorage };
};
