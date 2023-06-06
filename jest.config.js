import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default {
    // Other Jest configuration options...
    setupFilesAfterEnv: ['dotenv/config'],
  };
