import axios from 'axios';
import express from 'express';

import { body, query, validationResult } from 'express-validator';

import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export { axios, express, body, query, validationResult, CryptoJS };

export const env = process.env;