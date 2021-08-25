const reqMade = (req,res , next) => {
    console.log(`request made: ${req.originalUrl}`.black.bgBrightGreen)
    next()
}

export {reqMade}