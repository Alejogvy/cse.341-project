const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/users');

// Middlewarex
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', usersController.getAll);

router.get(
    '/:id',
    param('id').isMongoId().withMessage('Invalid user ID'),
    validateRequest,
    usersController.getSingle
);

router.post(
    '/',
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('favoriteColor').optional().isString(),
        body('birthday').optional().isISO8601().toDate()
    ],
    validateRequest,
    usersController.createUser
);

router.put(
    '/:id',
    [
        param('id').isMongoId().withMessage('Invalid user ID'),
        body('userName').notEmpty().withMessage('User name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('name').notEmpty().withMessage('Name is required'),
        body('ipaddress').optional().isIP().withMessage('Invalid IP address')
    ],
    validateRequest,
    usersController.updateUser
);

router.delete(
    '/:id',
    param('id').isMongoId().withMessage('Invalid user ID'),
    validateRequest,
    usersController.deleteUser
);

module.exports = router;
