import { CldFactory, loadModule } from 'cld3-asm';

const globalForCld3Factory = global as unknown as { cld3Factory: CldFactory };

export const loadCld3Factory = async () => {
  return globalForCld3Factory.cld3Factory || (await loadModule());
};
