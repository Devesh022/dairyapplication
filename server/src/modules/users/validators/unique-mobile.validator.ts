import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/user.repository";

@ValidatorConstraint({async: true})
export class UniqueMobileValidator implements ValidatorConstraintInterface {
  async validate(mobile: any, args: ValidationArguments) {
    const { constraints } = args;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOneByMobile(mobile);
    if (!user) {
      return true;
    }
    return false;
  }
}