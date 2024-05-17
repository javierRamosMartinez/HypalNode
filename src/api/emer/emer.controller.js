const Emer = require("./emer.model");


const addEmer = async (req, res) => {
    try {
        const emer = new Emer(req.body)

        const codeExist = await Emer.findOne({ code: req.body.code })
        if (codeExist) {
            return res.status(400).json({ status: 400, message: "This emer is already registered" });

        }
        const newEmer = await emer.save();
        // console.log(newEmer);
        return res.json({
            status: 201,
            message: `Emer ${emer.name} created`,
        });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
}
const removeEmer = async (req, res) => {
    try {
        const emer = await Emer.findByIdAndDelete(req.params.id);
        res.json({ status: 200, msg: "ok", data: emer });
    } catch (error) {
        res.status(500).json(error);

    }
}

const updateEmer = async (req, res) => {
    try {
        // obtengo los datos que hay que editar del body / payload
        const id = req.params.id;
        // busco por id el animal a editar
        const emer = await Emer.findById(id);
        const body = req.body;
        // uso la funcion mongo que sirve para editar cosas
        const updatedEmer = await Emer.findByIdAndUpdate(id, body);
        if (!updatedEmer) {
            return res.status(404).json({ message: "Cant find this id" })
        }
        // respondo al cliente
        res.json({
            status: 200,
            message: "Updated succesfully",
            data: updatedEmer,
        });
    } catch (error) {
        console.log("error-update", error);
    }
};


module.exports = { addEmer, removeEmer, updateEmer }