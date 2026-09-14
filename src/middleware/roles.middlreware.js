const requiredrole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({
                message: "forbidden"
            });
        }
        next();
    };
};
export default requiredrole;
