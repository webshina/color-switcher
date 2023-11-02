import { Router } from 'express';

const router = Router();

// Auth
router.get('/api/test', () => {
  console.log('test');
});
export { router };
