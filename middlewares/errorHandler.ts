const errorHandler = (error: any, req: any, res: any, next: any) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    const validation = error.validation
    res.status(status).json({
        message,
        data,
        validation
    })
}

export default errorHandler