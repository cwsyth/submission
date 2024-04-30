const getToken = (req) => {
    const authHeader = req.get('authorization');

    if(authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.replace('Bearer ', '');
    }
    return null;
};

module.exports = {
    getToken
};