import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema'

const sql = neon('postgresql://expense%20traccker_owner:iQ7JAfZmM5as@ep-holy-union-a5ofp746.us-east-2.aws.neon.tech/expense%20traccker?sslmode=require');
export const db = drizzle(sql,{schema});