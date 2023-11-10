import { setupDB } from '@/tests/utils';

const mainSetup = async () => {
  // eslint-disable-next-line no-console
  console.log('Jest Setup: Migrating Test DB');
  await setupDB();
};

export default mainSetup;
