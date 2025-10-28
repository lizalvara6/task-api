import { body, param } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';
import * as taskService from '../services/taskService.js';

export const validateTask = [
  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be at least 3 and at most 100 characters'),

  body('completed')
    .optional()
    .isBoolean()
    .withMessage('completed must be true or false'),

  checkValidationResults,
];

export const validateTaskId = [
  param('id')
    .exists()
    .withMessage('Task ID is required')
    .bail()
    .isInt()
    .withMessage('Task ID must be an integer')
    .bail()
    .custom(async (value) => {
      const task = await taskService.getTaskById(value);
      if (!task) {
        const error = new Error('Task not found');
        error.status = 404;
        throw error;
      }
      return true;
    }),
  checkValidationResults,
];