export const order = async (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    res.send("order received");
}