const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).
        catch((err) =>next(err))
    }
}

export {asyncHandler}

// const asyncHandler = (reqHandler) => async (req, res, next) => {
//     try {
//         await reqHandler(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// export {asyncHandler}