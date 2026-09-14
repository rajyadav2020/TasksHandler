const validate = (schema, part) => {
    return (req, res, next) => {
        const result = schema.safeParse(req[part]);
        if (!result.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: result.error.flatten()
            });
        }
        next();
    };
};
export default validate;
