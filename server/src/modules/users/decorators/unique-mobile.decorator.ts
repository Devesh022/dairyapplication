import { ValidationOptions, registerDecorator } from 'class-validator';
import { UniqueMobileValidator } from '../validators/unique-mobile.validator';

export function UniqueMobile(
  validationOptions?: ValidationOptions,
  exclude?: Object,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [exclude],
      validator: UniqueMobileValidator,
    });
  };
}
