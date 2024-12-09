import * as Joi from 'joi';

import { Config } from '../model';

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (): Config => {
    const env = process.env;
    const validationSchema = Joi.object<Config>().unknown().keys({
      API_PORT: Joi.number().required(),
      JWT_SECRET: Joi.string().required(),
      API_KEY: Joi.string().required(),
    });

    const result = validationSchema.validate(env);
    if (result.error) {
      throw new Error(`Configuration not valid: ${result.error.message}`);
    }

    return result.value;
  },
};
