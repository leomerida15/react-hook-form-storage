import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { defaultValuesStorage, setStorage } from './commons';
import React from 'react';

const ControllerStorageComp = <
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues
>(
  key: string,
  props: ControllerProps<TFieldValues, TName>
) => {
  props.defaultValue = defaultValuesStorage(key) || props.defaultValue;

  const renderNative = props.render;

  props.render = params => {
    const onChangeHookFormNative = params.field.onChange;

    params.field.onChange = e => {
      const obj = Object.fromEntries([[props.name, e.target.value]]);

      setStorage(key, obj);

      onChangeHookFormNative(e);
    };

    return renderNative(params);
  };

  return <Controller {...props} />;
};

export const createComp = (key: string) => {
  const ControlerStorage = <
    TName extends FieldPath<TFieldValues>,
    TFieldValues extends FieldValues = FieldValues
  >(
    props: ControllerProps<TFieldValues, TName>
  ) => {
    return ControllerStorageComp(key, props);
  };

  return { ControlerStorage };
};
