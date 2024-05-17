const NValue = require("./nValue.model");


const addNValue = async (req, res) => {
    try {
        const nValue = new NValue(req.body)

        const codeExist = await NValue.findOne({ code: req.body.code })
        if (codeExist) {
            return res.status(400).json({ status: 400, message: "This nValue is already registered" });

        }
        const newNValue = await nValue.save();
        return res.json({
            status: 201,
            message: `NValue ${nValue.name} created`,
        });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
}
const removeNValue = async (req, res) => {
    try {
        const nValue = await NValue.findByIdAndDelete(req.params.id);
        res.json({ status: 200, msg: "ok", data: nValue });
    } catch (error) {
        res.status(500).json(error);

    }
}

const updateNValue = async (req, res) => {
    try {
        // obtengo los datos que hay que editar del body / payload
        const id = req.params.id;
        // busco por id el animal a editar
        const nValue = await NValue.findById(id);
        const body = req.body;
        // uso la funcion mongo que sirve para editar cosas
        const updatedNValue = await NValue.findByIdAndUpdate(id, body);
        if (!updatedNValue) {
            return res.status(404).json({ message: "Cant find this id" })
        }
        // respondo al cliente
        res.json({
            status: 200,
            message: "Updated succesfully",
            data: updatedNValue,
        });
    } catch (error) {
        console.log("error-update", error);
    }
};


module.exports = { addNValue, removeNValue, updateNValue }