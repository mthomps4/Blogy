import { resetDB } from '@/tests/utils';

const mainSetup = async () => {
  // eslint-disable-next-line no-console
  console.log('Jest Teardown: Disconnecting from DB');
  await resetDB();
};

export default mainSetup;
