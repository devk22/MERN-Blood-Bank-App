const testController = (req, res) => {
    res.status(200).send({
        message: "Welcome to the blood bank app",
        success: true,
    })
};

//exporting the callback functions
module.exports = { testController };