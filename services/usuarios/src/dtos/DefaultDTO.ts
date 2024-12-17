import { validateSync } from 'class-validator';
import { FieldsValidationError } from 'node-backend-utils/classes';

export class DefaultDTO {

  validate() {
    const validationErrors = validateSync(this, { stopAtFirstError: true });
    const messages: string[] = [];

    if (!Array.isArray(validationErrors) || !validationErrors.length) {
      return;
    }

    validationErrors.forEach((validationError) => {
      const fieldErrors = Object.values(validationError.constraints);

      messages.push(...fieldErrors);
    });

    throw new FieldsValidationError(messages);
  }
}