const Food = require('./food.model');

const getAllFoods = async (req, res, next) => {
    try {
        const foods = await Food.find();
        res.json({ status: 200, msg: 'ok', data: foods });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};

const getOneFood = async (req, res, next) => {
    try {
        const foods = await Food.findById(id);
        res.json({ status: 200, msg: 'ok', data: foods });
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const addFood = async (req, res, next) => {
    const { fName, fCode, fAllergId, fImg, fIng, fNValue, fDiet, fBrand, fComments } = req.body;
    try {
        const food = new Food({ fName, fCode, fAllergId, fImg, fIng, fNValue, fDiet, fBrand, fComments });
        await food.save();
        res.json(food);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const removeFood = async (req, res, next) => {
    try {
        const id = req.params.id;
        const food = await Food.findByIdAndDelete(id);

        res.json({ message: 'Food removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};