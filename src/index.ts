import { createComp } from './controllerStorage';
import { createHookController } from './useControllerStorage';
import { createHook } from './useFormStorage';

export const createFormStora = (key: string) => {
  const { ControlerStorage } = createComp(key);
  const { useFormStorage } = createHook(key);
  const { useControllerStorage } = createHookController(key);

  return { ControlerStorage, useFormStorage, useControllerStorage };
};
