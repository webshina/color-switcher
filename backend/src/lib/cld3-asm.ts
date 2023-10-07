import { CldFactory, loadModule } from 'cld3-asm';

const globalForCld3Factory = global as unknown as { cld3Factory: CldFactory };

export const loadCld3Factory = async () => {
  if (!globalForCld3Factory.cld3Factory) {
    const cld3Factory = await loadModule();
    globalForCld3Factory.cld3Factory = cld3Factory;
  }

  return globalForCld3Factory.cld3Factory;
};
